"use client";

import { Pie, PieChart, LabelList } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

type StatusItem = {
  status: string;
  count: number;
};

type Props = {
  data: StatusItem[] | null | undefined;
};

const STATUS_META: Record<
  string,
  {
    key: string;   // used for CSS var name, e.g. "completed"
    label: string; // human label
  }
> = {
  STARTED: { key: "started", label: "Started" },
  COMPLETED: { key: "completed", label: "Completed" },
  TERMINATED: { key: "terminated", label: "Terminated" },
  QUOTA_FULL: { key: "quota_full", label: "Quota Full" },
};

// Config for ChartContainer (like your example)
const chartConfig = {
  responses: {
    label: "Responses",
  },
  started: {
    label: "Started",
    color: "var(--chart-1)",
  },
  completed: {
    label: "Completed",
    color: "var(--chart-2)",
  },
  terminated: {
    label: "Terminated",
    color: "var(--chart-3)",
  },
  quota_full: {
    label: "Quota Full",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export default function StatusPieChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <Card className="flex h-full flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Status Distribution
          </CardTitle>
          <CardDescription>No response status data available yet.</CardDescription>
        </CardHeader>
        <CardContent />
      </Card>
    );
  }

  const total = data.reduce((sum, item) => sum + (item.count ?? 0), 0);

  // Map your status data into the shape used by the shadcn example
  const chartData = data
    .filter((item) => item.count > 0)
    .map((item) => {
      const meta =
        STATUS_META[item.status] ?? {
          key: item.status.toLowerCase().replace(/\s+/g, "_"),
          label: item.status,
        };

      return {
        status: item.status,
        statusKey: meta.key,        // used only for internal reference
        label: meta.label,
        responses: item.count,      // numeric value for the pie
        fill: `var(--color-${meta.key})`,
      };
    });

  const completedItem = data.find((d) => d.status === "COMPLETED");
  const completedPercent =
    total && completedItem ? ((completedItem.count / total) * 100).toFixed(1) : "0.0";

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-start pb-0">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          Status Distribution
          {total > 0 && (
            <Badge
              variant="outline"
              className="ml-1 border-none bg-emerald-500/10 text-emerald-500"
            >
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>{completedPercent}% completed</span>
            </Badge>
          )}
        </CardTitle>
        <CardDescription>Total responses: {total}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0 pt-2 max-h-[250px]">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="responses"
                  // we’ll use the label from payload instead of default label
                  labelFormatter={(_, payload) => {
                    const p = payload?.[0]?.payload as (typeof chartData)[number] | undefined;
                    return p?.label ?? "";
                  }}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="responses"
              nameKey="label"
              innerRadius={40}
              paddingAngle={4}
              cornerRadius={8}
            >
              <LabelList
                dataKey="responses"
                stroke="none"
                fontSize={11}
                fontWeight={500}
                fill="currentColor"
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
