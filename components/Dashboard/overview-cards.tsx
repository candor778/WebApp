"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  FolderKanban, 
  FileCheck, 
  MessageSquare, 
  AlertCircle, 
  TrendingUp 
} from "lucide-react";

type OverviewProps = {
  overview: {
    total_projects: number;
    total_submissions: number;
    total_responses: number;
    quota_reached: number;
    new_responses_today: number;
  };
};

export default function OverviewCards({ overview }: OverviewProps) {
  const items = [
    { 
      label: "Total Projects", 
      value: overview.total_projects,
      icon: FolderKanban,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    { 
      label: "Total Submissions", 
      value: overview.total_submissions,
      icon: FileCheck,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    { 
      label: "Total Responses", 
      value: overview.total_responses,
      icon: MessageSquare,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200"
    },
    { 
      label: "Quota Reached", 
      value: overview.quota_reached,
      icon: AlertCircle,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200"
    },
    { 
      label: "New Responses Today", 
      value: overview.new_responses_today,
      icon: TrendingUp,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200"
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card
            key={item.label}
            className={`transition-all duration-200 hover:-translate-y-1 hover:shadow-lg border-l-4 ${item.borderColor} overflow-hidden relative group`}
          >
            <div className={`absolute inset-0 ${item.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
            <CardHeader className="pb-2 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {item.label}
                </CardTitle>
                <div className={`${item.bgColor} ${item.color} p-2 rounded-lg transition-transform duration-200 group-hover:scale-110`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold tracking-tight">
                  {item.value.toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}