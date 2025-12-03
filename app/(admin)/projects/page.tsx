import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { getSupabaseAdmin } from "@/lib/supabase/admin"
import { ProjectsClient } from "@/components/projectx-client"

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

  return <ProjectsClient projects={projectsWithCounts} />
}