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

export async function GET() {
  try {
    const admin = await verifyAdminAccess()
    if (!admin) {
      return NextResponse.json({ error: "Only admin can view users" }, { status: 403 })
    }

    const supabaseAdmin = getSupabaseAdmin()
    const { data, error } = await supabaseAdmin.auth.admin.listUsers()

    if (error) {
      throw error
    }

    // Return user list without sensitive data
    const users = data.users.map((user) => ({
      id: user.id,
      email: user.email,
      createdAt: user.created_at,
      lastSignIn: user.last_sign_in_at,
    }))

    return NextResponse.json({ users })
  } catch (error: any) {
    console.error("List users error:", error)
    return NextResponse.json({ error: error.message || "Failed to list users" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { superPassword, email, password } = await request.json()

    // Validate super password
    const validSuperPassword = process.env.SUPER_PASSWORD
    if (!validSuperPassword || superPassword !== validSuperPassword) {
      return NextResponse.json({ error: "Invalid Super Password" }, { status: 403 })
    }

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const admin = await verifyAdminAccess()
    if (!admin) {
      return NextResponse.json({ error: "Only admin can create users" }, { status: 403 })
    }

    const supabaseAdmin = getSupabaseAdmin()

    // Create user with admin client
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      userId: data.user?.id,
      email: data.user?.email,
    })
  } catch (error: any) {
    console.error("Create user error:", error)
    return NextResponse.json({ error: error.message || "Failed to create user" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { superPassword, userId } = await request.json()

    // Validate super password
    const validSuperPassword = process.env.SUPER_PASSWORD
    if (!validSuperPassword || superPassword !== validSuperPassword) {
      return NextResponse.json({ error: "Invalid Super Password" }, { status: 403 })
    }

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const admin = await verifyAdminAccess()
    if (!admin) {
      return NextResponse.json({ error: "Only admin can delete users" }, { status: 403 })
    }

    // Prevent admin from deleting themselves
    if (admin.id === userId) {
      return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 })
    }

    const supabaseAdmin = getSupabaseAdmin()

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (error: any) {
    console.error("Delete user error:", error)
    return NextResponse.json({ error: error.message || "Failed to delete user" }, { status: 500 })
  }
}
