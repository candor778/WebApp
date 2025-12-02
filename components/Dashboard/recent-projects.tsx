"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Link from "next/link";

type RecentItem = {
  project_internal_id: string;
  external_project_id: string;
  title: string;
  description: string | null;
  is_active: boolean;
  created_at: string; // from Supabase as ISO string
  responses_count: number;
};

function formatDate(dateString: string) {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return dateString;
  return d.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RecentProjects({
  data,
}: {
  data: RecentItem[] | null | undefined;
}) {
  const navigate = useRouter()
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Recent Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No projects have been created yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  const items = data.slice(0, 5); // just in case, enforce max 5

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-sm font-medium">
            Recent Projects
          </CardTitle>
          <span className="text-xs text-muted-foreground">
            Last {items.length} created
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          {items.map((p) => (
            <Link
              href={`/projects/${p.project_internal_id}`}
              key={p.project_internal_id}
              className="flex items-start justify-between gap-3 rounded-md border bg-card px-3 py-2"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{p.title}</span>
                  <Badge
                    variant={p.is_active ? "default" : "outline"}
                    className={
                      p.is_active
                        ? "border-transparent"
                        : "border-muted-foreground/40 text-muted-foreground"
                    }
                  >
                    {p.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-mono">
                    {p.external_project_id}
                  </span>
                  <span>•</span>
                  <span>{formatDate(p.created_at)}</span>
                </div>
                {p.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {p.description}
                  </p>
                )}
              </div>
              <div className="shrink-0 text-right">
                <div className="text-sm font-semibold">
                  {p.responses_count}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  responses
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
