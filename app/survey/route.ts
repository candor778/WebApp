// app/survey/route.ts
// Survey Capture Route
// This is called when external surveys redirect users to capture metadata

import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"
import { parseDeviceType, parseBrowserName, getIpAddress, getGeoData, type GeoData, EMPTY_GEO } from "@/lib/db"

// ================= BLOCK BOTS =================
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
  return BLOCKED_AGENT_SUBSTRINGS.some(token => lower.includes(token.toLowerCase()))
}

// ================= VALID STATUSES =================
const VALID_STATUSES = new Set([
  "STARTED",
  "COMPLETED",
  "TERMINATED",
  "QUOTA_FULL",
  "QUALITY_TERMINATED",
])

// ================= SUSPICIOUS PATTERNS =================
const SUSPICIOUS_PATTERNS = [/script/i, /<.*>/, /javascript:/i, /on\w+=/i]

// ================= MAIN ROUTE =================
export async function GET(request: NextRequest) {
  try {
    // Block previews/crawlers BEFORE any DB or heavy logic
    const userAgent = request.headers.get("user-agent") || "unknown"
    if (isPreviewOrCrawler(userAgent)) {
      return new NextResponse(null, { status: 204 })
    }

    const searchParams = request.nextUrl.searchParams
    const projectId = searchParams.get("projectId")
    const status = searchParams.get("status")
    const userId = searchParams.get("userId")

    // ================= VALIDATION =================
    if (!projectId || !status || !userId) {
      return NextResponse.json(
        { error: "Missing required parameters: projectId, status, and userId are required" },
        { status: 400 },
      )
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(projectId)) {
      return NextResponse.json(
        { error: "Invalid projectId format. Only alphanumeric characters, hyphens, and underscores allowed" },
        { status: 400 },
      )
    }

    if (userId.length < 1 || userId.length > 255) {
      return NextResponse.json(
        { error: "Invalid userId. Must be between 1 and 255 characters" },
        { status: 400 },
      )
    }

    // Check suspicious patterns before any DB work
    if (SUSPICIOUS_PATTERNS.some(pattern => pattern.test(userId))) {
      console.warn(`Suspicious userId detected: ${userId}`)
      return NextResponse.json({ error: "Invalid userId format" }, { status: 400 })
    }

    const upperStatus = status.toUpperCase()
    if (!VALID_STATUSES.has(upperStatus)) {
      return NextResponse.json(
        { error: "Invalid status. Must be one of: STARTED, COMPLETED, TERMINATED, QUOTA_FULL, QUALITY_TERMINATED" },
        { status: 400 },
      )
    }

    // ================= METADATA =================
    const ipAddress = getIpAddress(request.headers)
    const deviceType = parseDeviceType(userAgent)
    const browserName = parseBrowserName(userAgent)

    const adminClient = getSupabaseAdmin()

    // ================= PROJECT =================
    // Fetch existing project first
    const { data: existingProject, error: fetchError } = await adminClient
      .from("projects")
      .select("id, is_active, title")
      .eq("project_id", projectId)
      .single()

    let project = existingProject

    // Create project if it doesn't exist
    if (fetchError?.code === "PGRST116" || !project) {
      const { data: newProject, error: createError } = await adminClient
        .from("projects")
        .insert({
          project_id: projectId,
          title: projectId,
          description: `Auto-generated project for ${projectId}`,
          is_active: true,
        })
        .select("id, is_active, title")
        .single()

      if (createError) {
        // Race condition: another request created it simultaneously
        if (createError.code === "23505") {
          const { data: retryProject } = await adminClient
            .from("projects")
            .select("id, is_active, title")
            .eq("project_id", projectId)
            .single()

          if (retryProject) {
            project = retryProject
          } else {
            return NextResponse.json({ error: "Failed to create or retrieve project" }, { status: 500 })
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
    } else if (fetchError) {
      // Any error other than "no rows"
      console.error("Error fetching project:", fetchError)
      return NextResponse.json(
        { error: "Failed to verify project", details: fetchError.message },
        { status: 500 },
      )
    }

    if (!project) {
      return NextResponse.json({ error: "Failed to resolve project" }, { status: 500 })
    }

    if (!project.is_active) {
      const disabledUrl = new URL("/project-disabled", request.url)
      disabledUrl.searchParams.set("projectId", projectId)
      disabledUrl.searchParams.set("projectName", project.title || projectId)
      return NextResponse.redirect(disabledUrl)
    }

    // ================= DUPLICATE CHECK =================
    // Only COMPLETED responses from the same IP are true duplicates.
    // A prior STARTED from the same IP should not block a legitimate completion.
    const { data: existingCompleted } = await adminClient
      .from("responses")
      .select("id, status, ip_address")
      .eq("project_id", project.id)
      .eq("ip_address", ipAddress)
      .eq("status", "COMPLETED")
      .maybeSingle()

    if (existingCompleted) {
      const thankYouUrl = new URL("/thank-you", request.url)
      thankYouUrl.searchParams.set("projectId", projectId)
      thankYouUrl.searchParams.set("userId", userId)
      thankYouUrl.searchParams.set("status", existingCompleted.status)
      thankYouUrl.searchParams.set("ipAddress", existingCompleted.ip_address || "N/A")
      thankYouUrl.searchParams.set("responseId", existingCompleted.id)
      thankYouUrl.searchParams.set("duplicate", "true")
      return NextResponse.redirect(thankYouUrl)
    }

    // ================= GEO CACHE =================
    let geo: GeoData = EMPTY_GEO

    const { data: cached } = await adminClient
      .from("ip_geo_cache")
      // Select only geo columns — avoids spreading DB metadata into responses
      .select("country, country_code, city, state, latitude, longitude, isp, timezone")
      .eq("ip", ipAddress)
      .maybeSingle()

    if (cached) {
      geo = cached as GeoData
    } else {
      geo = await getGeoData(ipAddress)
      await adminClient.from("ip_geo_cache").upsert({ ip: ipAddress, ...geo })
    }

    // ================= INSERT RESPONSE =================
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
        // GEO DATA
        country: geo.country,
        country_code: geo.country_code,
        city: geo.city,
        state: geo.state,
        latitude: geo.latitude,
        longitude: geo.longitude,
        isp: geo.isp,
        timezone: geo.timezone,
      })
      .select("id")
      .single()

    if (responseError) {
      console.error("Error creating response:", responseError)

      // Race condition: another request inserted same (project_id, user_id, ip_address) simultaneously
      if (responseError.code === "23505") {
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

    if (!response) {
      console.error("Response insert returned no data")
      return NextResponse.json({ error: "Failed to record response" }, { status: 500 })
    }

    console.log(
      `Response created — userId: ${userId}, projectId: ${projectId}, responseId: ${response.id}, ip: ${ipAddress}`
    )

    // ================= REDIRECT =================
    const thankYouUrl = new URL("/thank-you", request.url)
    thankYouUrl.searchParams.set("projectId", projectId)
    thankYouUrl.searchParams.set("userId", userId)
    thankYouUrl.searchParams.set("status", upperStatus)
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