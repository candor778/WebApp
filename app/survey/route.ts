// Survey Capture Route
// This is called when external surveys redirect users to capture metadata
import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"
import { parseDeviceType, parseBrowserName, getIpAddress } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
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
    const userAgent = request.headers.get("user-agent") || "unknown"
    const deviceType = parseDeviceType(userAgent)
    const browserName = parseBrowserName(userAgent)

    const adminClient = getSupabaseAdmin()

    // Parallel fetch: Check both project and existing response simultaneously
    const [projectResult, existingResponseResult] = await Promise.allSettled([
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
        .maybeSingle() // Use maybeSingle to avoid error on no results
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

    // Handle existing response check result
    let existingResponse = null
    if (existingResponseResult.status === "fulfilled") {
      const { data, error } = existingResponseResult.value
      if (error) {
        console.error("Error checking for existing response:", error)
        // Continue anyway - better to allow potential duplicate than block legitimate user
      } else {
        existingResponse = data
      }
    }

    if (existingResponse) {
      // User already submitted - redirect with existing data
      const thankYouUrl = new URL("/thank-you", request.url)
      thankYouUrl.searchParams.set("projectId", projectId)
      thankYouUrl.searchParams.set("userId", userId)
      thankYouUrl.searchParams.set("status", existingResponse.status)
      thankYouUrl.searchParams.set("ipAddress", existingResponse.ip_address || "N/A")
      thankYouUrl.searchParams.set("responseId", existingResponse.id)
      thankYouUrl.searchParams.set("duplicate", "true")
      
      return NextResponse.redirect(thankYouUrl)
    }

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
      if (responseError.code === "23505") {
        // Fetch the existing response that was created in parallel
        const { data: racedResponse } = await adminClient
          .from("responses")
          .select("id, status, ip_address")
          .eq("project_id", project.id)
          .eq("user_id", userId)
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
    console.log(`Response created successfully - userId: ${userId}, projectId: ${projectId}, responseId: ${response.id}`)

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