//api/projects/[id]/route.ts
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const adminClient = getSupabaseAdmin()
    const { data: project, error } = await adminClient.from("projects").select("*").eq("id", id).single()

    if (error || !project) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { is_active } = body

    if (typeof is_active !== "boolean") {
      return NextResponse.json({ error: "is_active must be a boolean" }, { status: 400 })
    }

    const adminClient = getSupabaseAdmin()

    // Check if project exists
    const { data: project, error: fetchError } = await adminClient
      .from("projects")
      .select("id, is_active")
      .eq("id", id)
      .single()

    if (fetchError || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Update the project status
    const { data: updatedProject, error: updateError } = await adminClient
      .from("projects")
      .update({ 
        is_active,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single()

    if (updateError) {
      throw updateError
    }

    return NextResponse.json({
      success: true,
      message: `Project ${is_active ? "activated" : "deactivated"} successfully`,
      project: updatedProject,
    })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json({ error: "Super password is required" }, { status: 400 })
    }

    const SUPER_PASSWORD = process.env.SUPER_PASSWORD

    if (!SUPER_PASSWORD) {
      console.error("SUPER_PASSWORD not configured")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    if (password !== SUPER_PASSWORD) {
      return NextResponse.json({ error: "Incorrect super password" }, { status: 403 })
    }

    const adminClient = getSupabaseAdmin()

    // Check if project exists
    const { data: project, error: fetchError } = await adminClient.from("projects").select("id").eq("id", id).single()

    if (fetchError || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Delete the project (cascade will handle responses)
    const { error: deleteError } = await adminClient.from("projects").delete().eq("id", id)

    if (deleteError) {
      throw deleteError
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}