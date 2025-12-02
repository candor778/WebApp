import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { GlobalRespondentsList } from "@/components/global-respondents-list"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export default async function RespondentsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch projects for filter dropdown
  const adminClient = getSupabaseAdmin()
  const { data: projects } = await adminClient
    .from("projects")
    .select("id, project_id, title")
    .order("created_at", { ascending: false })

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
        <h1 className="text-lg font-semibold">Respondents</h1>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <Card>
          <CardContent className="pt-6">
            <GlobalRespondentsList projects={projects || []} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
