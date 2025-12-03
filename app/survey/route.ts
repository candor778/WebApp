// Survey Capture Route
// This is called when external surveys redirect users to capture metadata
import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"
import { parseDeviceType, parseBrowserName, getIpAddress } from "@/lib/db"

// 👇 Add a small helper + list of known preview/crawler agents
const BLOCKED_AGENT_SUBSTRINGS = [
  "WhatsApp",           // WhatsApp link preview
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
  return BLOCKED_AGENT_SUBSTRINGS.some(token => lower.includes(token.toLowerCase()))
}

export async function GET(request: NextRequest) {
  try {
    // 👇 Read UA immediately and block previews BEFORE any DB / heavy logic
    const userAgent = request.headers.get("user-agent") || "unknown"
    if (isPreviewOrCrawler(userAgent)) {
      // 204 = No Content (safe for bots, invisible to users)
      return new NextResponse(null, { status: 204 })
    }

    const searchParams = request.nextUrl.searchParams
    const projectId = searchParams.get("projectId")
    const status = searchParams.get("status")
    const userId = searchParams.get("userId")

    // Validate required parameters
    if (!projectId || !status || !userId) {
      return NextResponse.json(
        { error: "Missing required parameters: projectId, status, and userId are required" },
        { status: 400 },
      )
    }

    // Validate projectId format (alphanumeric, hyphens, underscores only)
    if (!/^[a-zA-Z0-9_-]+$/.test(projectId)) {
      return NextResponse.json(
        { error: "Invalid projectId format. Only alphanumeric characters, hyphens, and underscores allowed" },
        { status: 400 },
      )
    }

    // Validate userId format and length
    if (userId.length < 1 || userId.length > 255) {
      return NextResponse.json(
        { error: "Invalid userId. Must be between 1 and 255 characters" },
        { status: 400 },
      )
    }

    // Validate status enum
    const validStatuses = ["STARTED", "COMPLETED", "TERMINATED", "QUOTA_FULL"]
    const upperStatus = status.toUpperCase()
    if (!validStatuses.includes(upperStatus)) {
      return NextResponse.json(
        { error: "Invalid status. Must be one of: completed, terminated, quota full" },
        { status: 400 },
      )
    }

    // Get metadata from request
    const ipAddress = getIpAddress(request.headers)
    const deviceType = parseDeviceType(userAgent)
    const browserName = parseBrowserName(userAgent)

    const adminClient = getSupabaseAdmin()

    // Parallel fetch: Check both project and existing response simultaneously
    const [projectResult, existingResponsesResult] = await Promise.allSettled([
      adminClient
        .from("projects")
        .select("id, is_active")
        .eq("project_id", projectId)
        .single(),
      adminClient
        .from("responses")
        .select("id, status, ip_address, created_at")
        .eq("project_id", projectId) // Use projectId string for initial check
        .eq("user_id", userId)
    ])

    // Handle project fetch result
    let project = null
    if (projectResult.status === "fulfilled") {
      const { data, error } = projectResult.value
      if (error && error.code !== "PGRST116") {
        console.error("Error fetching project:", error)
        return NextResponse.json(
          { error: "Failed to verify project", details: error.message },
          { status: 500 },
        )
      }
      project = data
    } else {
      console.error("Project fetch failed:", projectResult.reason)
      return NextResponse.json({ error: "Failed to verify project" }, { status: 500 })
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
        // Check if it's a duplicate key error (race condition)
        if (createError.code === "23505") {
          // Try to fetch again - another request may have created it
          const { data: retryProject } = await adminClient
            .from("projects")
            .select("id, is_active")
            .eq("project_id", projectId)
            .single()
          
          if (retryProject) {
            project = retryProject
          } else {
            return NextResponse.json(
              { error: "Failed to create or retrieve project" },
              { status: 500 },
            )
          }
        } else {
          console.error("Error creating project:", createError)
          return NextResponse.json(
            { error: "Failed to create project", details: createError.message },
            { status: 500 },
          )
        }
      } else {
        project = newProject
      }
    }

    // Check if project is active
    if (!project.is_active) {
      return NextResponse.json(
        { error: "Project is not active and cannot accept responses" },
        { status: 403 },
      )
    }

    // Handle existing responses check result
    let existingResponses: Array<{ id: string; status: string; ip_address: string | null; created_at: string }> = []
    if (existingResponsesResult.status === "fulfilled") {
      const { data, error } = existingResponsesResult.value
      if (error) {
        console.error("Error checking for existing responses:", error)
        // Continue anyway - better to allow potential duplicate than block legitimate user
      } else {
        existingResponses = data || []
      }
    }

    // NEW LOGIC: Check if user has already submitted from THIS IP address
    const existingResponseFromSameIP = existingResponses.find(
      (response) => response.ip_address === ipAddress
    )

    if (existingResponseFromSameIP) {
      // User already submitted from this IP - redirect with existing data
      const thankYouUrl = new URL("/thank-you", request.url)
      thankYouUrl.searchParams.set("projectId", projectId)
      thankYouUrl.searchParams.set("userId", userId)
      thankYouUrl.searchParams.set("status", existingResponseFromSameIP.status)
      thankYouUrl.searchParams.set("ipAddress", existingResponseFromSameIP.ip_address || "N/A")
      thankYouUrl.searchParams.set("responseId", existingResponseFromSameIP.id)
      thankYouUrl.searchParams.set("duplicate", "true")
      
      return NextResponse.redirect(thankYouUrl)
    }

    // If we reach here, either:
    // 1. User has never submitted for this project, OR
    // 2. User has submitted before but from a different IP address
    // In both cases, we allow the submission

    // Additional check: Verify userId doesn't contain suspicious patterns
    const suspiciousPatterns = [
      /script/i,
      /<.*>/,
      /javascript:/i,
      /on\w+=/i
    ]
    
    if (suspiciousPatterns.some(pattern => pattern.test(userId))) {
      console.warn(`Suspicious userId detected: ${userId}`)
      return NextResponse.json(
        { error: "Invalid userId format" },
        { status: 400 },
      )
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
      
      // Handle duplicate key error (race condition)
      // Note: This should rarely happen now since we're checking IP address
      if (responseError.code === "23505") {
        // Fetch the existing response that was created in parallel
        const { data: racedResponse } = await adminClient
          .from("responses")
          .select("id, status, ip_address")
          .eq("project_id", project.id)
          .eq("user_id", userId)
          .eq("ip_address", ipAddress)
          .single()
        
        if (racedResponse) {
          const thankYouUrl = new URL("/thank-you", request.url)
          thankYouUrl.searchParams.set("projectId", projectId)
          thankYouUrl.searchParams.set("userId", userId)
          thankYouUrl.searchParams.set("status", racedResponse.status)
          thankYouUrl.searchParams.set("ipAddress", racedResponse.ip_address || "N/A")
          thankYouUrl.searchParams.set("responseId", racedResponse.id)
          thankYouUrl.searchParams.set("duplicate", "true")
          
          return NextResponse.redirect(thankYouUrl)
        }
      }
      
      return NextResponse.json(
        { error: "Failed to create response", details: responseError.message },
        { status: 500 },
      )
    }

    // Log successful response creation
    console.log(`Response created successfully - userId: ${userId}, projectId: ${projectId}, responseId: ${response.id}, ipAddress: ${ipAddress}`)
    
    // If this is a subsequent submission from a different IP, log it
    if (existingResponses.length > 0) {
      console.log(`User ${userId} has submitted ${existingResponses.length} time(s) before from different IP address(es)`)
    }

    // Redirect to thank you page
    const thankYouUrl = new URL("/thank-you", request.url)
    thankYouUrl.searchParams.set("projectId", projectId)
    thankYouUrl.searchParams.set("userId", userId)
    thankYouUrl.searchParams.set("status", status)
    thankYouUrl.searchParams.set("ipAddress", ipAddress)
    thankYouUrl.searchParams.set("responseId", response.id)

    return NextResponse.redirect(thankYouUrl)
  } catch (error) {
    console.error("Error processing survey request:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}