// lib/dashboard-stats.ts
import { createClient } from "@/lib/supabase/server";

type Overview = {
  total_projects: number;
  total_submissions: number;
  total_responses: number;
  quota_reached: number;
  new_responses_today: number;
};

type ResponsesByProjectItem = {
  project_internal_id: string;
  external_project_id: string;
  title: string;
  responses_count: number;
};

type StatusDistributionItem = {
  status: string;
  count: number;
};

type ProjectLeaderboardItem = {
  project_internal_id: string;
  external_project_id: string;
  title: string;
  is_active: boolean;
  total_responses: number;
  completed_responses: number;
  failed_responses: number;
  quota_full_hits: number;
  completion_rate_percentage: number;
  failure_rate_percentage: number;
};

type RecentProjectItem = {
  project_internal_id: string;
  external_project_id: string;
  title: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  responses_count: number;
};

export async function getDashboardStats(): Promise<{
  overview: Overview;
  responses_by_project: ResponsesByProjectItem[];
  status_distribution: StatusDistributionItem[];
  project_leaderboard: ProjectLeaderboardItem[];
  recent_projects: RecentProjectItem[];
}> {
  const supabase = await createClient();

  const now = new Date();
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  // 1) Fetch projects + 2) all responses (only needed columns)
  const [projectsRes, responsesRes] = await Promise.all([
    supabase
      .from("projects")
      .select(
        "id, project_id, title, description, is_active, created_at",
        { count: "exact" }
      ),
    supabase
      .from("responses")
      .select("project_id, status, created_at"),
  ]);

  if (projectsRes.error) {
    console.error("Projects query error:", projectsRes.error);
    throw projectsRes.error;
  }
  if (responsesRes.error) {
    console.error("Responses query error:", responsesRes.error);
    throw responsesRes.error;
  }

  const projects = (projectsRes.data ?? []) as {
    id: string;
    project_id: string;
    title: string;
    description: string | null;
    is_active: boolean;
    created_at: string;
  }[];

  const responses = (responsesRes.data ?? []) as {
    project_id: string | null;
    status: string;
    created_at: string;
  }[];

  // -------------------- OVERVIEW --------------------
  const total_projects = projectsRes.count ?? projects.length;
  const total_submissions = responses.length;

  let total_responses = 0; // COMPLETED
  let quota_reached = 0;   // QUOTA_FULL
  let new_responses_today = 0;

  // For charts + leaderboard + recent
  const statusCounts = new Map<string, number>();
  const responsesByProject = new Map<string, number>();

  // For leaderboard: per-project stats
  const projectStats = new Map<
    string,
    {
      total: number;
      completed: number;
      failed: number;
      quota: number;
      quality_terminated: number;
    }
  >();

  for (const r of responses) {
    // Completed / quota for overview
    if (r.status === "COMPLETED") {
      total_responses++;
    }
    if (r.status === "QUOTA_FULL") {
      quota_reached++;
    }

    // Today
    const created = new Date(r.created_at);
    if (created >= todayStart) {
      new_responses_today++;
    }

    // Status distribution
    statusCounts.set(r.status, (statusCounts.get(r.status) ?? 0) + 1);

    // Per-project aggregations
    if (r.project_id) {
      // Responses by project (for bar chart)
      responsesByProject.set(
        r.project_id,
        (responsesByProject.get(r.project_id) ?? 0) + 1
      );

      // Detailed project stats (for leaderboard / recent)
      const current = projectStats.get(r.project_id) ?? {
        total: 0,
        completed: 0,
        failed: 0,
        quota: 0,
        quality_terminated:0,
      };

      current.total += 1;
      if (r.status === "COMPLETED") current.completed += 1;
      if (r.status === "TERMINATED") current.failed += 1;
      if (r.status === "QUOTA_FULL") current.quota += 1;
      if (r.status === "QUALITY_TERMINATED") current.quality_terminated += 1;

      projectStats.set(r.project_id, current);
    }
  }

  const overview: Overview = {
    total_projects,
    total_submissions,
    total_responses,
    quota_reached,
    new_responses_today,
  };

  // -------------------- RESPONSES BY PROJECT (bar chart) - TOP 5 --------------------
  const responses_by_project: ResponsesByProjectItem[] = Array.from(
    responsesByProject.entries()
  )
    .map(([projectId, count]) => {
      const project = projects.find((p) => p.id === projectId);
      return {
        project_internal_id: projectId,
        external_project_id: project?.project_id ?? "UNKNOWN",
        title: project?.title ?? "Unknown project",
        responses_count: count,
      };
    })
    .sort((a, b) => b.responses_count - a.responses_count) // Sort by count descending
    .slice(0, 5); // Cap at top 5 projects

  // -------------------- STATUS DISTRIBUTION (pie chart) --------------------
  const status_distribution: StatusDistributionItem[] = Array.from(
    statusCounts.entries()
  ).map(([status, count]) => ({
    status,
    count,
  }));

  // -------------------- PROJECT LEADERBOARD - TOP 20 --------------------
  const project_leaderboard: ProjectLeaderboardItem[] = projects
    .map((p) => {
      const stats = projectStats.get(p.id) ?? {
        total: 0,
        completed: 0,
        failed: 0,
        quota: 0,
        quality_terminated:0,
      };

      const total = stats.total;
      const completionRate =
        total > 0 ? Number(((stats.completed / total) * 100).toFixed(2)) : 0;
      const failureRate =
        total > 0 ? Number(((stats.failed / total) * 100).toFixed(2)) : 0;

      return {
        project_internal_id: p.id,
        external_project_id: p.project_id,
        title: p.title,
        is_active: p.is_active,
        total_responses: total,
        completed_responses: stats.completed,
        failed_responses: stats.failed,
        quota_full_hits: stats.quota,
        quality_terminated: stats.quality_terminated,
        completion_rate_percentage: completionRate,
        failure_rate_percentage: failureRate,
      };
    })
    .sort((a, b) => b.total_responses - a.total_responses) // Rank by total responses desc
    .slice(0, 20); // Cap at top 20 projects

  // -------------------- RECENT PROJECTS (max 5) --------------------
  const recent_projects: RecentProjectItem[] = [...projects]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5)
    .map((p) => {
      const stats = projectStats.get(p.id) ?? {
        total: 0,
        completed: 0,
        failed: 0,
        quota: 0,
        quality_terminated:0,
      };

      return {
        project_internal_id: p.id,
        external_project_id: p.project_id,
        title: p.title,
        description: p.description,
        is_active: p.is_active,
        created_at: p.created_at,
        responses_count: stats.total,
      };
    });

  return {
    overview,
    responses_by_project,
    status_distribution,
    project_leaderboard,
    recent_projects,
  };
}