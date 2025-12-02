import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { FolderKanban } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { DeleteProjectButton } from "@/components/delete-project-button"
import { getSupabaseAdmin } from "@/lib/supabase/admin"
import { ExportButton } from "@/components/export-button"
import { ProjectCard } from "@/components/project-card"

export default async function ProjectsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const adminClient = getSupabaseAdmin()

  const { data: projects, error } = await adminClient
    .from("projects")
    .select(`
      id,
      project_id,
      title,
      description,
      is_active,
      created_at,
      responses(count)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching projects:", error)
  }

  const projectsWithCounts = (projects || []).map((p: any) => ({
    ...p,
    responseCount: p.responses?.[0]?.count || 0,
  }))

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
        <h1 className="text-lg font-semibold">Projects</h1>
      </header>

      <main className="flex-1 p-4 md:p-6">
        {projectsWithCounts.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <FolderKanban className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No projects yet</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              Projects are auto-created when external surveys redirect users here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projectsWithCounts.map((project: any) => (
              <Link key={project.id} href={`/projects/${project.id}`} prefetch={true} className="block group">
                <ProjectCard project={project} />
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
