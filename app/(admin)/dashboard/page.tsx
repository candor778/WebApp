// app/(admin)/dashboard/page.tsx
import OverviewCards from "@/components/Dashboard/overview-cards";
import ProjectLeaderboard from "@/components/Dashboard/project-leaderboard";
import RecentProjects from "@/components/Dashboard/recent-projects";
import RespondentByProjectChart from "@/components/Dashboard/respondent-by-project-chart";
import StatusPieChart from "@/components/Dashboard/status-pie-chart";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getDashboardStats } from "@/lib/dashboard-stats";
import { Separator } from "@radix-ui/react-separator";

// optional: control caching
export const revalidate = 30; // static-ish, refreshed every 30s
// or: export const dynamic = "force-dynamic"; if you want pure SSR

export default async function DashboardPage() {
  const {
    overview,
    responses_by_project,
    status_distribution,
    project_leaderboard,
    recent_projects,
  } = await getDashboardStats();

  return (
    <>
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </header>
    <div className="space-y-6 p-6">
      {/* 1) Top cards */}
      <OverviewCards overview={overview} />

      {/* 2) Row: Horizontal Bar + Pie */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <RespondentByProjectChart data={responses_by_project} />
        <StatusPieChart data={status_distribution} />
      </div>

      {/* 3) Project Performance Leaderboard */}
      <ProjectLeaderboard data={project_leaderboard} />

      {/* 4) Recent Projects */}
      <RecentProjects data={recent_projects} />
    </div>
    </>
  );
}
