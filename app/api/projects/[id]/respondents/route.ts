// app/api/projects/[id]/respondents/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id: projectId } = await params
    const searchParams = request.nextUrl.searchParams
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const status = searchParams.get("status")
    const userId = searchParams.get("userId")

    

    const adminClient = getSupabaseAdmin()

    // Verify project exists
    const { data: project, error: projectError } = await adminClient
      .from("projects")
      .select("id, project_id, title")
      .eq("id", projectId)
      .single()

    if (projectError || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Build query for responses
    let query = adminClient
      .from("responses")
      .select(
        `
        id,
        project_id,
        user_id,
        ip_address,
        user_agent,
        device_type,
        browser_name,
        status,
        created_at,
        completed_at
      `,
        { count: "exact" }
      )
      .eq("project_id", projectId)

    // Apply filters
    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    if (userId && userId.trim()) {
      query = query.ilike("user_id", `%${userId.trim()}%`)
    }

    // Order and paginate
    query = query.order("created_at", { ascending: false }).range(offset, offset + limit - 1)

    const { data: responses, error, count } = await query

    if (error) {
      console.error("Error fetching respondents:", error)
      return NextResponse.json({ error: "Failed to fetch respondents" }, { status: 500 })
    }

    // Transform data
    const respondents = (responses || []).map((response: any) => ({
      id: response.id,
      projectId: project.project_id,
      userId: response.user_id,
      ipAddress: response.ip_address,
      deviceType: response.device_type,
      browserName: response.browser_name,
      status: response.status,
      createdAt: response.created_at,
      completedAt: response.completed_at,
      // For backward compatibility with existing UI
      respondentName: response.user_id,
      respondentEmail: null,
      respondentPhone: "N/A",
    }))

    return NextResponse.json({
      respondents,
      pagination: {
        total: count || 0,
        offset,
        limit,
        hasMore: (count || 0) > offset + limit,
      },
    })
  } catch (error) {
    console.error("Error fetching project respondents:", error)
    return NextResponse.json({ error: "Failed to fetch respondents" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Verify user is authenticated
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Validate ID format
    if (!id || id.trim() === "") {
      return NextResponse.json({ error: "Invalid respondent ID" }, { status: 400 })
    }

    const adminClient = getSupabaseAdmin()

    // Check if respondent exists
    const { data: respondent, error: fetchError } = await adminClient
      .from("responses")
      .select("id, user_id, project_id")
      .eq("id", id)
      .single()

    if (fetchError || !respondent) {
      return NextResponse.json({ error: "Respondent not found" }, { status: 404 })
    }

    // Delete the respondent
    const { error: deleteError } = await adminClient
      .from("responses")
      .delete()
      .eq("id", id)

    if (deleteError) {
      console.error("Error deleting respondent:", deleteError)
      return NextResponse.json(
        { error: "Failed to delete respondent", details: deleteError.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Respondent deleted successfully",
        deletedId: id 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Delete respondent error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}