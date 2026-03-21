// app/api/projects/[id]/title/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // Auth check
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Parse body
  let title: string
  try {
    const body = await request.json()
    title = body.title?.trim()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 })
  }

  if (title.length > 255) {
    return NextResponse.json({ error: "Title must be 255 characters or fewer" }, { status: 400 })
  }

  // Update
  const adminClient = getSupabaseAdmin()
  const { data, error } = await adminClient
    .from("projects")
    .update({ title })
    .eq("id", id)
    .select("id, title")
    .single()

  if (error) {
    console.error("Failed to update project title:", error)
    return NextResponse.json({ error: "Failed to update title" }, { status: 500 })
  }

  return NextResponse.json({ project: data })
}