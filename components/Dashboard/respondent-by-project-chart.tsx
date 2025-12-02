"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type RespondentByProjectItem = {
  project_internal_id: string;
  external_project_id: string;
  title: string;
  responses_count: number;
};

type Props = {
  data: RespondentByProjectItem[] | null | undefined;
};

export default function RespondentByProjectChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Respondents by Project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No respondent data available yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Optional: limit to top 10 projects so the chart doesn't get too wide
  const chartData = data.slice(0, 10);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Respondents by Project
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="title"
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 11 }}
                interval={0}
              />
              <YAxis />
              <Tooltip
                formatter={(value: any) => [`${value} respondents`, "Count"]}
                labelFormatter={(label) => {
                  const item = chartData.find((d) => d.title === label);
                  return item
                    ? `${item.title} (${item.external_project_id})`
                    : label;
                }}
              />
              <Bar dataKey="responses_count" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Showing top {chartData.length} projects by respondent count.
        </p>
      </CardContent>
    </Card>
  );
}