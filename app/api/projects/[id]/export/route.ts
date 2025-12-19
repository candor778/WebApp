//app/api/projects/[id]/export/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"
import * as XLSX from "xlsx"

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

    // Get date filter parameters from URL
    const searchParams = request.nextUrl.searchParams
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    const adminClient = getSupabaseAdmin()

    // Fetch project
    const { data: project, error: projectError } = await adminClient.from("projects").select("*").eq("id", id).single()

    if (projectError || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Build query for responses
    let query = adminClient
      .from("responses")
      .select("*")
      .eq("project_id", id)

    // Apply date range filter if provided
    if (startDate && endDate) {
      const start = new Date(startDate)
      start.setHours(0, 0, 0, 0)
      
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      
      query = query.gte("created_at", start.toISOString())
      query = query.lte("created_at", end.toISOString())
    }

    const { data: responses, error: responsesError } = await query.order("created_at", { ascending: false })

    if (responsesError) {
      console.error("Error fetching responses:", responsesError)
      return NextResponse.json({ error: "Failed to fetch responses" }, { status: 500 })
    }

    // Prepare data for Excel - metadata only
    const excelData = (responses || []).map((response: any) => ({
      "Response ID": response.id,
      "Project ID": project.project_id,
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
        "Response ID": "",
        "Project ID": project.project_id,
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

    XLSX.utils.book_append_sheet(workbook, worksheet, "Responses")

    // Generate filename with date range if provided
    let filename = `${project.project_id}_responses`
    
    if (startDate && endDate) {
      filename += `_${startDate}_to_${endDate}`
    }
    
    filename += `_${new Date().toISOString().split("T")[0]}.xlsx`

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
    console.error("Export error:", error)
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 })
  }
}