// app/api/respondents/export/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"
import * as XLSX from "xlsx"

const ALLOWED_GEO_FIELDS = new Set(["country", "country_code", "city", "state"])

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const projectId     = searchParams.get("projectId")
    const status        = searchParams.get("status")
    const userId        = searchParams.get("userId")
    const searchProjectId = searchParams.get("searchProjectId")
    const geoField      = searchParams.get("geoField")
    const geoValue      = searchParams.get("geoValue")
    const startDate     = searchParams.get("startDate")
    const endDate       = searchParams.get("endDate")

    const adminClient = getSupabaseAdmin()

    // Fetch all projects (for filename resolution)
    const { data: projects, error: projectsError } = await adminClient
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })

    if (projectsError || !projects || projects.length === 0) {
      return NextResponse.json({ error: "No projects found" }, { status: 404 })
    }

    // Build query
    let query = adminClient.from("responses").select(`
      *,
      projects!inner(id, project_id, title)
    `)

    if (projectId && projectId !== "all") {
      query = query.eq("project_id", projectId)
    }

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    // userId — case-SENSITIVE partial match (like, not ilike)
    if (userId && userId.trim()) {
      query = query.like("user_id", `%${userId.trim()}%`)
    }

    if (searchProjectId && searchProjectId.trim()) {
      query = query.ilike("projects.project_id", `%${searchProjectId.trim()}%`)
    }

    // Geo filter — case-INSENSITIVE (ilike), whitelisted columns only
    if (geoField && geoValue && ALLOWED_GEO_FIELDS.has(geoField)) {
      query = query.ilike(geoField, `%${geoValue.trim()}%`)
    }

    if (startDate && endDate) {
      const start = new Date(startDate)
      start.setHours(0, 0, 0, 0)
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      query = query
        .gte("created_at", start.toISOString())
        .lte("created_at", end.toISOString())
    }

    const { data: responses, error: responsesError } = await query.order("created_at", { ascending: false })

    if (responsesError) {
      console.error("Error fetching responses:", responsesError)
      return NextResponse.json({ error: "Failed to fetch responses" }, { status: 500 })
    }

    // Build Excel rows — geo columns inserted right after "IP Address"
    const excelData = (responses || []).map((response: any) => ({
      "Project ID":    response.projects?.project_id || "-",
      "Project Title": response.projects?.title || "-",
      "Response ID":   response.id,
      "User ID":       response.user_id,
      "Status":        response.status,
      "Device Type":   response.device_type || "-",
      "Browser":       response.browser_name || "-",
      "IP Address":    response.ip_address || "-",
      // ── Geo columns (after IP Address) ──────────────────────────────
      "Country":       response.country      || "-",
      "Country Code":  response.country_code || "-",
      "City":          response.city         || "-",
      "State":         response.state        || "-",
      "Latitude":      response.latitude     || "-",
      "Longitude":     response.longitude    || "-",
      "ISP":           response.isp          || "-",
      "Timezone":      response.timezone     || "-",
      // ────────────────────────────────────────────────────────────────
      "User Agent":    response.user_agent   || "-",
      "Created At":    new Date(response.created_at).toLocaleString(),
      "Completed At":  response.completed_at
        ? new Date(response.completed_at).toLocaleString()
        : "-",
    }))

    // Empty-state placeholder row
    if (excelData.length === 0) {
      excelData.push({
        "Project ID": "", "Project Title": "", "Response ID": "", "User ID": "",
        "Status": "", "Device Type": "", "Browser": "", "IP Address": "",
        "Country": "", "Country Code": "", "City": "", "State": "",
        "Latitude": "", "Longitude": "", "ISP": "", "Timezone": "",
        "User Agent": "", "Created At": "", "Completed At": "",
      })
    }

    const workbook  = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(excelData)

    // Auto-size columns
    const maxWidth = 50
    const columnWidths = Object.keys(excelData[0]).map((key) => {
      const maxLen = Math.max(
        key.length,
        ...excelData.map((row: any) => String(row[key] || "").length)
      )
      return { wch: Math.min(maxLen + 2, maxWidth) }
    })
    worksheet["!cols"] = columnWidths

    // Build filename
    let filename = "responses"
    if (projectId && projectId !== "all") {
      const project = projects.find((p: any) => p.id === projectId)
      if (project) filename = `${project.project_id}_responses`
    } else if (searchProjectId) {
      filename = `${searchProjectId}_filtered_responses`
    } else {
      filename = "all_responses"
    }
    if (status && status !== "all") filename += `_${status.toLowerCase()}`
    if (startDate && endDate)       filename += `_${startDate}_to_${endDate}`
    filename += `_${new Date().toISOString().split("T")[0]}.xlsx`

    XLSX.utils.book_append_sheet(workbook, worksheet, "Responses")
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Export error details:", error)
    return NextResponse.json(
      { error: "Failed to export data", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}