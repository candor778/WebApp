import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { FileText, CheckCircle, XCircle, BarChart3, TrendingUp, Clock, ArrowRight } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const adminClient = getSupabaseAdmin()
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekStart = new Date(todayStart)
  weekStart.setDate(weekStart.getDate() - 7)

  // Fetch all stats in parallel
  const [
    { count: totalProjects },
    { count: activeProjects },
    { count: totalResponses },
    { count: completedResponses },
    { count: terminatedResponses },
    { count: responsesToday },
    { count: responsesThisWeek },
    { data: recentProjects },
  ] = await Promise.all([
    adminClient.from("projects").select("*", { count: "exact", head: true }),
    adminClient.from("projects").select("*", { count: "exact", head: true }).eq("is_active", true),
    adminClient.from("responses").select("*", { count: "exact", head: true }),
    adminClient.from("responses").select("*", { count: "exact", head: true }).eq("status", "COMPLETED"),
    adminClient.from("responses").select("*", { count: "exact", head: true }).eq("status", "TERMINATED"),
    adminClient
      .from("responses")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayStart.toISOString()),
    adminClient
      .from("responses")
      .select("*", { count: "exact", head: true })
      .gte("created_at", weekStart.toISOString()),
    adminClient
      .from("projects")
      .select(`
        id,
        project_id,
        title,
        is_active,
        created_at,
        responses(count)
      `)
      .order("created_at", { ascending: false })
      .limit(10),
  ])

  // Calculate inactive projects count
  const inactiveProjects = (totalProjects || 0) - (activeProjects || 0)

  const statsCards = [
    {
      title: "Total Projects",
      value: totalProjects || 0,
      description: "All projects created",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "Active Projects",
      value: activeProjects || 0,
      description: "Currently active",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "Inactive Projects",
      value: inactiveProjects,
      description: "Paused or completed",
      icon: XCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
    },
    {
      title: "Total Submissions",
      value: totalResponses || 0,
      description: `${completedResponses || 0} completed, ${terminatedResponses || 0} terminated`,
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
      title: "Today",
      value: responsesToday || 0,
      description: "Submissions today",
      icon: Clock,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-950",
    },
    {
      title: "This Week",
      value: responsesThisWeek || 0,
      description: "Submissions last 7 days",
      icon: TrendingUp,
      color: "text-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-950",
    },
  ]

  const projectsWithCounts = (recentProjects || []).map((p: any) => ({
    ...p,
    responseCount: p.responses?.[0]?.count || 0,
  }))

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </header>

      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
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
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Your latest projects</CardDescription>
            </div>
            <Link href="/projects" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {projectsWithCounts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No projects yet. Projects are auto-created when surveys redirect here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {projectsWithCounts.map((project: any) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-muted-foreground">{project.project_id}</span>
                        <Badge
                          variant={project.is_active ? "default" : "secondary"}
                          className={project.is_active ? "bg-green-600" : ""}
                        >
                          {project.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <h4 className="font-medium truncate">{project.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        Created {new Date(project.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{project.responseCount}</p>
                      <p className="text-xs text-muted-foreground">responses</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
