// API route to change user password
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { createClient as createServerClient } from "@/lib/supabase/server"

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase credentials")
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

async function verifyAdminAccess() {
  const supabase = await createServerClient()
  const { data: currentUser } = await supabase.auth.getUser()
  const adminEmail = process.env.ADMIN_EMAIL || "admin@admin.com"

  if (!currentUser?.user || currentUser.user.email !== adminEmail) {
    return null
  }
  return currentUser.user
}

export async function PUT(request: Request) {
  try {
    const { superPassword, userId, newPassword } = await request.json()

    // Validate super password
    const validSuperPassword = process.env.SUPER_PASSWORD
    if (!validSuperPassword || superPassword !== validSuperPassword) {
      return NextResponse.json({ error: "Invalid Super Password" }, { status: 403 })
    }

    // Validate inputs
    if (!userId || !newPassword) {
      return NextResponse.json({ error: "User ID and new password are required" }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const admin = await verifyAdminAccess()
    if (!admin) {
      return NextResponse.json({ error: "Only admin can change passwords" }, { status: 403 })
    }

    const supabaseAdmin = getSupabaseAdmin()

    // Update user password using admin API
    const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      password: newPassword,
    })

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    })
  } catch (error: any) {
    console.error("Change password error:", error)
    return NextResponse.json({ error: error.message || "Failed to change password" }, { status: 500 })
  }
}
