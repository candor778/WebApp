import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekStart = new Date(todayStart)
    weekStart.setDate(weekStart.getDate() - 7)

    const [
      { count: totalProjects },
      { count: activeProjects },
      { count: totalResponses },
      { count: completedResponses },
      { count: terminatedResponses },
      { count: responsesToday },
      { count: responsesThisWeek },
      { data: recentProjects },
    ] = await Promise.all([
      // Total projects
      supabase
        .from("projects")
        .select("*", { count: "exact", head: true }),
      // Active projects
      supabase
        .from("projects")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true),
      // Total responses
      supabase
        .from("responses")
        .select("*", { count: "exact", head: true }),
      // Completed responses
      supabase
        .from("responses")
        .select("*", { count: "exact", head: true })
        .eq("status", "COMPLETED"),
      // Terminated responses
      supabase
        .from("responses")
        .select("*", { count: "exact", head: true })
        .eq("status", "TERMINATED"),
      // Responses today
      supabase
        .from("responses")
        .select("*", { count: "exact", head: true })
        .gte("created_at", todayStart.toISOString()),
      // Responses this week
      supabase
        .from("responses")
        .select("*", { count: "exact", head: true })
        .gte("created_at", weekStart.toISOString()),
      // Recent projects
      supabase
        .from("projects")
        .select("id, project_id, title, is_active, created_at")
        .order("created_at", { ascending: false })
        .limit(10),
    ])

    // Get response counts for recent projects
    const projectsWithCounts = await Promise.all(
      (recentProjects || []).map(async (project) => {
        const { count } = await supabase
          .from("responses")
          .select("*", { count: "exact", head: true })
          .eq("project_id", project.id)
        return {
          id: project.id,
          projectId: project.project_id,
          title: project.title,
          isPublished: project.is_active,
          createdAt: project.created_at,
          responseCount: count || 0,
        }
      }),
    )

    // Calculate closed projects (is_active = false but has responses)
    const { count: closedProjects } = await supabase
      .from("projects")
      .select("*, responses!inner(*)", { count: "exact", head: true })
      .eq("is_active", false)

    return NextResponse.json({
      stats: {
        totalSurveys: totalProjects || 0,
        activeSurveys: activeProjects || 0,
        closedSurveys: closedProjects || 0,
        totalResponses: totalResponses || 0,
        completedResponses: completedResponses || 0,
        terminatedResponses: terminatedResponses || 0,
        responsesToday: responsesToday || 0,
        responsesThisWeek: responsesThisWeek || 0,
      },
      recentProjects: projectsWithCounts,
    })
  } catch (error) {
    console.error("Dashboard stats error:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
