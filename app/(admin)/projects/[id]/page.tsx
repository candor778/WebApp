// app/(admin)/projects/[id]/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Users, CheckCircle, XCircle, Clock, TrendingUp, AlertTriangle } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ProjectRespondentsList } from "@/components/project-respondents-list"
import { getSupabaseAdmin } from "@/lib/supabase/admin"
import { ExportButton } from "@/components/export-button"

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const adminClient = getSupabaseAdmin()

  const { data: project, error: projectError } = await adminClient.from("projects").select("*").eq("id", id).single()

  if (projectError || !project) {
    notFound()
  }

  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekStart = new Date(todayStart)
  weekStart.setDate(weekStart.getDate() - 7)

  const [
    { count: totalResponses },
    { count: completedResponses },
    { count: terminatedResponses },
    { count: quotaFullResponses },
    { count: responsesToday },
    { count: responsesThisWeek },
  ] = await Promise.all([
    adminClient.from("responses").select("*", { count: "exact", head: true }).eq("project_id", id),
    adminClient
      .from("responses")
      .select("*", { count: "exact", head: true })
      .eq("project_id", id)
      .eq("status", "COMPLETED"),
    adminClient
      .from("responses")
      .select("*", { count: "exact", head: true })
      .eq("project_id", id)
      .eq("status", "TERMINATED"),
    adminClient
      .from("responses")
      .select("*", { count: "exact", head: true })
      .eq("project_id", id)
      .eq("status", "QUOTA_FULL"),
    adminClient
      .from("responses")
      .select("*", { count: "exact", head: true })
      .eq("project_id", id)
      .gte("created_at", todayStart.toISOString()),
    adminClient
      .from("responses")
      .select("*", { count: "exact", head: true })
      .eq("project_id", id)
      .gte("created_at", weekStart.toISOString()),
  ])

  const statsCards = [
    {
      title: "Total Respondents",
      value: totalResponses || 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "Completed",
      value: completedResponses || 0,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "Terminated",
      value: terminatedResponses || 0,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950",
    },
    {
      title: "Quota Full",
      value: quotaFullResponses || 0,
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
    },
    {
      title: "Today",
      value: responsesToday || 0,
      icon: Clock,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-950",
    },
    {
      title: "This Week",
      value: responsesThisWeek || 0,
      icon: TrendingUp,
      color: "text-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-950",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
        <Link href="/projects" prefetch={true}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
      </header>

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-sm text-muted-foreground">{project.project_id}</span>
              <Badge
                variant={project.is_active ? "default" : "secondary"}
                className={project.is_active ? "bg-green-600" : ""}
              >
                {project.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold">{project.title}</h1>
            {project.description && <p className="text-muted-foreground mt-1">{project.description}</p>}
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {statsCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-md ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Respondents</CardTitle>
            <CardDescription>All responses for this project</CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectRespondentsList projectId={project.id} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
