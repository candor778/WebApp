import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { UserManagement } from "@/components/user-management"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export default async function UsersPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const adminEmail = process.env.ADMIN_EMAIL || "admin@admin.com"
  if (data.user.email !== adminEmail) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
        <h1 className="text-lg font-semibold">User Management</h1>
      </header>
      <main className="flex flex-1 flex-col p-4 md:p-8">
        <UserManagement />
      </main>
    </div>
  )
}
