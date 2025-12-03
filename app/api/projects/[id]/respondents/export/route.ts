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

    // ====== Search Params ======
    const searchParams = request.nextUrl.searchParams

    const projectId = searchParams.get("projectId")
    const status = searchParams.get("status") // STARTED, COMPLETED, TERMINATED, QUOTA_FULL, QUALITY_TERMINATED or all
    const userId = searchParams.get("userId") // partial match

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      )
    }

    const adminClient = getSupabaseAdmin()

    // ====== Fetch Project ======
    const { data: project, error: projectError } = await adminClient
      .from("projects")
      .select("id, project_id, title")
      .eq("id", projectId)
      .single()

    if (projectError || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // ====== Build Responses Query ======
    let query = adminClient
      .from("responses")
      .select("*")
      .eq("project_id", projectId)

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    if (userId && userId.trim()) {
      query = query.ilike("user_id", `%${userId.trim()}%`)
    }

    const { data: responses, error: responsesError } = await query.order(
      "created_at",
      { ascending: false }
    )

    if (responsesError) {
      console.error("Error fetching responses:", responsesError)
      return NextResponse.json(
        { error: "Failed to fetch responses" },
        { status: 500 }
      )
    }

    // ====== Excel Data ======
    const excelData = (responses || []).map((response: any) => ({
      "Project ID": project.project_id,
      "Project Title": project.title,
      "Response ID": response.id,
      "User ID": response.user_id,
      Status: response.status,
      "Device Type": response.device_type || "-",
      Browser: response.browser_name || "-",
      "IP Address": response.ip_address || "-",
      "User Agent": response.user_agent || "-",
      "Created At": new Date(response.created_at).toLocaleString(),
      "Completed At": response.completed_at
        ? new Date(response.completed_at).toLocaleString()
        : "-",
    }))

    if (excelData.length === 0) {
      excelData.push({
        "Project ID": project.project_id,
        "Project Title": project.title,
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

    // ====== Excel Workbook ======
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(excelData)

    // Auto-size columns
    const maxWidth = 50
    const firstRow = excelData[0]
    worksheet["!cols"] = Object.keys(firstRow).map((key) => {
      const maxLength = Math.max(
        key.length,
        ...excelData.map((row: any) => String(row[key] || "").length)
      )
      return { wch: Math.min(maxLength + 2, maxWidth) }
    })

    XLSX.utils.book_append_sheet(workbook, worksheet, "Responses")

    // ====== Filename ======
    let filename = `${project.project_id}_responses`
    if (status && status !== "all") filename += `_${status.toLowerCase()}`
    if (userId && userId.trim()) filename += `_user-${userId.trim()}`

    filename += `_${new Date().toISOString().split("T")[0]}.xlsx`

    // ====== Excel Buffer ======
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
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
      { status: 500 }
    )
  }
}
