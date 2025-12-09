// app/api/survey-capture/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"
import { parseDeviceType, parseBrowserName, getIpAddress } from "@/lib/db"

// Domains allowed to call this API (Vite landing)
const ALLOWED_ORIGINS = [
  "https://candorsurvey.com",
  "https://www.candorsurvey.com",
  "http://localhost:8080"

]

function withCors(res: NextResponse, origin: string | null) {
  // Convert null → empty string so TS knows it's a real string
  const incoming = origin ?? ""

  // Pick the allowed origin or fallback to the first allowed one
  const safeOrigin: string =
    ALLOWED_ORIGINS.includes(incoming) ? incoming : ALLOWED_ORIGINS[0]

  res.headers.set("Access-Control-Allow-Origin", safeOrigin)
  res.headers.set("Access-Control-Allow-Credentials", "true")
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
  return res
}

// (optional) if you want to still block crawlers from hitting the API directly
const BLOCKED_AGENT_SUBSTRINGS = [
  "WhatsApp",
  "facebookexternalhit",
  "Facebot",
  "Twitterbot",
  "Slackbot",
  "TelegramBot",
  "Discordbot",
  "LinkedInBot",
]

function isPreviewOrCrawler(ua: string | null): boolean {
  if (!ua) return false
  const lower = ua.toLowerCase()
  return BLOCKED_AGENT_SUBSTRINGS.some((token) => lower.includes(token.toLowerCase()))
}

// Handle CORS preflight
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin")
  const res = new NextResponse(null, { status: 204 })
  return withCors(res, origin)
}

// You can use POST or GET. I'll keep GET to match your existing style.
export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin")

  try {
    const userAgent = request.headers.get("user-agent") || "unknown"

    if (isPreviewOrCrawler(userAgent)) {
      const res = new NextResponse(null, { status: 204 })
      return withCors(res, origin)
    }

    const searchParams = request.nextUrl.searchParams
    const projectId = searchParams.get("projectId")
    const status = searchParams.get("status")
    const userId = searchParams.get("userId")

    // Validate required parameters
    if (!projectId || !status || !userId) {
      const res = NextResponse.json(
        { error: "Missing required parameters: projectId, status, and userId are required" },
        { status: 400 },
      )
      return withCors(res, origin)
    }

    // Validate projectId format (alphanumeric, hyphens, underscores only)
    if (!/^[a-zA-Z0-9_-]+$/.test(projectId)) {
      const res = NextResponse.json(
        { error: "Invalid projectId format. Only alphanumeric characters, hyphens, and underscores allowed" },
        { status: 400 },
      )
      return withCors(res, origin)
    }

    // Validate userId format and length
    if (userId.length < 1 || userId.length > 255) {
      const res = NextResponse.json(
        { error: "Invalid userId. Must be between 1 and 255 characters" },
        { status: 400 },
      )
      return withCors(res, origin)
    }

    // Validate status enum
    const validStatuses = ["STARTED", "COMPLETED", "TERMINATED", "QUOTA_FULL", "QUALITY_TERMINATED"]
    const upperStatus = status.toUpperCase()
    if (!validStatuses.includes(upperStatus)) {
      const res = NextResponse.json(
        { error: "Invalid status. Must be one of: STARTED, COMPLETED, TERMINATED, QUOTA_FULL, QUALITY_TERMINATED" },
        { status: 400 },
      )
      return withCors(res, origin)
    }

    // Get metadata from request
    const ipAddress = getIpAddress(request.headers)
    const deviceType = parseDeviceType(userAgent)
    const browserName = parseBrowserName(userAgent)

    const adminClient = getSupabaseAdmin()

    // Parallel fetch: project + existing responses
    const [projectResult, existingResponsesResult] = await Promise.allSettled([
      adminClient
        .from("projects")
        .select("id, is_active")
        .eq("project_id", projectId)
        .single(),
      adminClient
        .from("responses")
        .select("id, status, ip_address, created_at")
        .eq("project_id", projectId)
        .eq("user_id", userId),
    ])

    // Handle project fetch
    let project: { id: string; is_active: boolean } | null = null

    if (projectResult.status === "fulfilled") {
      const { data, error } = projectResult.value
      if (error && error.code !== "PGRST116") {
        console.error("Error fetching project:", error)
        const res = NextResponse.json(
          { error: "Failed to verify project", details: error.message },
          { status: 500 },
        )
        return withCors(res, origin)
      }
      project = data
    } else {
      console.error("Project fetch failed:", projectResult.reason)
      const res = NextResponse.json({ error: "Failed to verify project" }, { status: 500 })
      return withCors(res, origin)
    }

    // Create project only if it doesn't exist
    if (!project) {
      const { data: newProject, error: createError } = await adminClient
        .from("projects")
        .insert({
          project_id: projectId,
          title: projectId,
          description: `Auto-generated project for ${projectId}`,
          is_active: true,
        })
        .select("id, is_active")
        .single()

      if (createError) {
        if (createError.code === "23505") {
          const { data: retryProject } = await adminClient
            .from("projects")
            .select("id, is_active")
            .eq("project_id", projectId)
            .single()

          if (retryProject) {
            project = retryProject
          } else {
            const res = NextResponse.json(
              { error: "Failed to create or retrieve project" },
              { status: 500 },
            )
            return withCors(res, origin)
          }
        } else {
          console.error("Error creating project:", createError)
          const res = NextResponse.json(
            { error: "Failed to create project", details: createError.message },
            { status: 500 },
          )
          return withCors(res, origin)
        }
      } else {
        project = newProject
      }
    }

    // Project inactive
    if (!project.is_active) {
      const res = NextResponse.json(
        { error: "Project is not active and cannot accept responses" },
        { status: 403 },
      )
      return withCors(res, origin)
    }

    // Existing responses
    let existingResponses:
      | Array<{ id: string; status: string; ip_address: string | null; created_at: string }>
      | [] = []

    if (existingResponsesResult.status === "fulfilled") {
      const { data, error } = existingResponsesResult.value
      if (error) {
        console.error("Error checking for existing responses:", error)
      } else {
        existingResponses = data || []
      }
    }

    const existingResponseFromSameIP = existingResponses.find(
      (response) => response.ip_address === ipAddress,
    )

    // Suspicious userId check
    const suspiciousPatterns = [/script/i, /<.*>/, /javascript:/i, /on\w+=/i]
    if (suspiciousPatterns.some((pattern) => pattern.test(userId))) {
      console.warn(`Suspicious userId detected: ${userId}`)
      const res = NextResponse.json(
        { error: "Invalid userId format" },
        { status: 400 },
      )
      return withCors(res, origin)
    }

    // If already from same IP → treat as duplicate and DO NOT insert again
    if (existingResponseFromSameIP) {
      const res = NextResponse.json(
        {
          success: true,
          duplicate: true,
          projectId,
          userId,
          status: existingResponseFromSameIP.status,
          ipAddress: existingResponseFromSameIP.ip_address || ipAddress,
          responseId: existingResponseFromSameIP.id,
        },
        { status: 200 },
      )
      return withCors(res, origin)
    }

    // Create new response
    const { data: response, error: responseError } = await adminClient
      .from("responses")
      .insert({
        project_id: project.id,
        user_id: userId,
        ip_address: ipAddress,
        user_agent: userAgent,
        device_type: deviceType,
        browser_name: browserName,
        status: upperStatus,
        completed_at: upperStatus === "COMPLETED" ? new Date().toISOString() : null,
      })
      .select("id")
      .single()

    if (responseError) {
      console.error("Error creating response:", responseError)

      if (responseError.code === "23505") {
        const { data: racedResponse } = await adminClient
          .from("responses")
          .select("id, status, ip_address")
          .eq("project_id", project.id)
          .eq("user_id", userId)
          .eq("ip_address", ipAddress)
          .single()

        if (racedResponse) {
          const res = NextResponse.json(
            {
              success: true,
              duplicate: true,
              projectId,
              userId,
              status: racedResponse.status,
              ipAddress: racedResponse.ip_address || ipAddress,
              responseId: racedResponse.id,
            },
            { status: 200 },
          )
          return withCors(res, origin)
        }
      }

      const res = NextResponse.json(
        { error: "Failed to create response", details: responseError.message },
        { status: 500 },
      )
      return withCors(res, origin)
    }

    console.log(
      `Response created successfully - userId: ${userId}, projectId: ${projectId}, responseId: ${response.id}, ipAddress: ${ipAddress}`,
    )

    if (existingResponses.length > 0) {
      console.log(
        `User ${userId} has submitted ${existingResponses.length} time(s) before from different IP address(es)`,
      )
    }

    const res = NextResponse.json(
      {
        success: true,
        duplicate: false,
        projectId,
        userId,
        status: upperStatus,
        ipAddress,
        responseId: response.id,
      },
      { status: 200 },
    )

    return withCors(res, origin)
  } catch (error) {
    console.error("Error processing survey request:", error)
    const res = NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
    return withCors(res, origin)
  }
}
