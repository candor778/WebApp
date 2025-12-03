import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const searchParams = request.nextUrl.searchParams
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const projectId = searchParams.get("projectId")
    const status = searchParams.get("status")
    const userId = searchParams.get("userId")

    const adminClient = getSupabaseAdmin()

    // Build query
    let query = adminClient.from("responses").select(
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
        completed_at,
        projects!inner(id, project_id, title)
      `,
      { count: "exact" },
    )

    // Apply filters with case-insensitive matching
    if (projectId && projectId !== "all") {
      // case-sensitive exact match on project_id
      query = query.eq("project_id", projectId)
    }

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    if (userId) {
      // Case-sensitive partial match on user_id
      query = query.like("user_id", `%${userId}%`)
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
      surveyId: response.project_id,
      projectId: response.projects.project_id,
      projectTitle: response.projects.title,
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
      answerCount: 0,
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
    console.error("Error fetching respondents:", error)
    return NextResponse.json({ error: "Failed to fetch respondents" }, { status: 500 })
  }
}