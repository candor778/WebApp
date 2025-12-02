import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const adminEmail = process.env.ADMIN_EMAIL || "admin@admin.com"
  const isAdmin = user.email === adminEmail

  return (
    <SidebarProvider>
      <AdminSidebar userEmail={user.email || ""} isAdmin={isAdmin} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
