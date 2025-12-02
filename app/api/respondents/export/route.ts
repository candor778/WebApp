// app/api/respondents/export/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"
import * as XLSX from "xlsx"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get filter parameters from URL
    const searchParams = request.nextUrl.searchParams
    const projectId = searchParams.get("projectId")
    const status = searchParams.get("status")
    const userId = searchParams.get("userId")
    const searchProjectId = searchParams.get("searchProjectId")

    const adminClient = getSupabaseAdmin()
    console.log(searchParams, projectId, status, userId, searchProjectId);
    
    // Fetch all projects
    const { data: projects, error: projectsError } = await adminClient
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })

    if (projectsError || !projects || projects.length === 0) {
      return NextResponse.json({ error: "No projects found" }, { status: 404 })
    }

    // Build query for responses
    let query = adminClient.from("responses").select(`
      *,
      projects!inner(id, project_id, title)
    `)

    // Apply filters
    if (projectId && projectId !== "all") {
      query = query.eq("project_id", projectId)
    }

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    if (userId && userId.trim()) {
      query = query.ilike("user_id", `%${userId.trim()}%`)
    }

    if (searchProjectId && searchProjectId.trim()) {
      query = query.ilike("projects.project_id", `%${searchProjectId.trim()}%`)
    }

    const { data: responses, error: responsesError } = await query.order("created_at", { ascending: false })

    if (responsesError) {
      console.error("Error fetching responses:", responsesError)
      return NextResponse.json({ error: "Failed to fetch responses" }, { status: 500 })
    }

    // Prepare data for Excel - metadata only
    const excelData = (responses || []).map((response: any) => ({
      "Project ID": response.projects?.project_id || "-",
      "Project Title": response.projects?.title || "-",
      "Response ID": response.id,
      "User ID": response.user_id,
      Status: response.status,
      "Device Type": response.device_type || "-",
      Browser: response.browser_name || "-",
      "IP Address": response.ip_address || "-",
      "User Agent": response.user_agent || "-",
      "Created At": new Date(response.created_at).toLocaleString(),
      "Completed At": response.completed_at ? new Date(response.completed_at).toLocaleString() : "-",
    }))

    // Handle empty responses case
    if (excelData.length === 0) {
      excelData.push({
        "Project ID": "",
        "Project Title": "",
        "Response ID": "",
        "User ID": "",
        Status: "",
        "Device Type": "",
        Browser: "",
        "IP Address": "",
        "User Agent": "",
        "Created At": "",
        "Completed At": "",
      })
    }

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(excelData)

    // Auto-size columns
    const maxWidth = 50
    const firstRow = excelData[0]
    const columnWidths = Object.keys(firstRow).map((key) => {
      const maxLength = Math.max(key.length, ...excelData.map((row: any) => String(row[key] || "").length))
      return { wch: Math.min(maxLength + 2, maxWidth) }
    })
    worksheet["!cols"] = columnWidths

    // Generate filename based on filters
    let filename = "responses"
    if (projectId && projectId !== "all") {
      const project = projects.find((p: any) => p.id === projectId)
      if (project) {
        filename = `${project.project_id}_responses`
      }
    } else if (searchProjectId) {
      filename = `${searchProjectId}_filtered_responses`
    } else {
      filename = "all_responses"
    }

    if (status && status !== "all") {
      filename += `_${status.toLowerCase()}`
    }

    filename += `_${new Date().toISOString().split("T")[0]}.xlsx`

    XLSX.utils.book_append_sheet(workbook, worksheet, "Responses")

    // Generate buffer
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

    // Return file
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Export error details:", error)
    return NextResponse.json(
      {
        error: "Failed to export data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
