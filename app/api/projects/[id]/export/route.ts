// app/api/projects/[id]/export/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"
import * as XLSX from "xlsx"

const ALLOWED_GEO_FIELDS = new Set(["country", "country_code", "city", "state"])

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const status    = searchParams.get("status")
    const userId    = searchParams.get("userId")
    const geoField  = searchParams.get("geoField")
    const geoValue  = searchParams.get("geoValue")
    const startDate = searchParams.get("startDate")
    const endDate   = searchParams.get("endDate")

    const adminClient = getSupabaseAdmin()

    const { data: project, error: projectError } = await adminClient
      .from("projects")
      .select("*")
      .eq("id", id)
      .single()

    if (projectError || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    let query = adminClient
      .from("responses")
      .select("*")
      .eq("project_id", id)

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    // userId — case-SENSITIVE partial match
    if (userId && userId.trim()) {
      query = query.like("user_id", `%${userId.trim()}%`)
    }

    // Geo filter — case-INSENSITIVE, whitelisted columns only
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
      "Response ID":  response.id,
      "Project ID":   project.project_id,
      "User ID":      response.user_id,
      "Status":       response.status,
      "Device Type":  response.device_type || "-",
      "Browser":      response.browser_name || "-",
      "IP Address":   response.ip_address || "-",
      // ── Geo columns (after IP Address) ──────────────────────────────
      "Country":      response.country      || "-",
      "Country Code": response.country_code || "-",
      "City":         response.city         || "-",
      "State":        response.state        || "-",
      "Latitude":     response.latitude     || "-",
      "Longitude":    response.longitude    || "-",
      "ISP":          response.isp          || "-",
      "Timezone":     response.timezone     || "-",
      // ────────────────────────────────────────────────────────────────
      "User Agent":   response.user_agent   || "-",
      "Created At":   new Date(response.created_at).toLocaleString(),
      "Completed At": response.completed_at
        ? new Date(response.completed_at).toLocaleString()
        : "-",
    }))

    if (excelData.length === 0) {
      excelData.push({
        "Response ID": "", "Project ID": project.project_id, "User ID": "",
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

    XLSX.utils.book_append_sheet(workbook, worksheet, "Responses")

    let filename = `${project.project_id}_responses`
    if (startDate && endDate) filename += `_${startDate}_to_${endDate}`
    filename += `_${new Date().toISOString().split("T")[0]}.xlsx`

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 })
  }
}