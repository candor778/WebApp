"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

type LeaderItem = {
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

type SortField = 
  | "total_responses" 
  | "completed_responses" 
  | "completion_rate_percentage" 
  | "failure_rate_percentage" 
  | "quota_full_hits";

type SortDirection = "asc" | "desc";

export default function ProjectLeaderboard({
  data,
}: {
  data: LeaderItem[] | null | undefined;
}) {
  const [sortField, setSortField] = useState<SortField>("total_responses");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Project Performance Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No project performance data available yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field selected, default to desc
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-1 h-3.5 w-3.5 opacity-50" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-1 h-3.5 w-3.5" />
    ) : (
      <ArrowDown className="ml-1 h-3.5 w-3.5" />
    );
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const rows = sortedData.slice(0, 20);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-sm font-medium">
            Project Performance Leaderboard
          </CardTitle>
          <span className="text-xs text-muted-foreground">
            Sorted by {sortField.replace(/_/g, " ")} ({sortDirection})
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="relative w-full overflow-auto max-h-[600px]">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead className="min-w-[180px] bg-background">Project</TableHead>
                <TableHead className="min-w-[120px] bg-background">External ID</TableHead>
                <TableHead className="text-right bg-background">
                  <button
                    onClick={() => handleSort("total_responses")}
                    className="inline-flex items-center hover:text-foreground transition-colors w-full justify-end font-medium"
                  >
                    Total
                    {getSortIcon("total_responses")}
                  </button>
                </TableHead>
                <TableHead className="text-right bg-background">
                  <button
                    onClick={() => handleSort("completed_responses")}
                    className="inline-flex items-center hover:text-foreground transition-colors w-full justify-end font-medium"
                  >
                    Completed
                    {getSortIcon("completed_responses")}
                  </button>
                </TableHead>
                <TableHead className="text-right bg-background">
                  <button
                    onClick={() => handleSort("completion_rate_percentage")}
                    className="inline-flex items-center hover:text-foreground transition-colors w-full justify-end font-medium"
                  >
                    Completion %
                    {getSortIcon("completion_rate_percentage")}
                  </button>
                </TableHead>
                <TableHead className="text-right bg-background">
                  <button
                    onClick={() => handleSort("failure_rate_percentage")}
                    className="inline-flex items-center hover:text-foreground transition-colors w-full justify-end font-medium"
                  >
                    Failure %
                    {getSortIcon("failure_rate_percentage")}
                  </button>
                </TableHead>
                <TableHead className="text-right bg-background">
                  <button
                    onClick={() => handleSort("quota_full_hits")}
                    className="inline-flex items-center hover:text-foreground transition-colors w-full justify-end font-medium"
                  >
                    Quota Full
                    {getSortIcon("quota_full_hits")}
                  </button>
                </TableHead>
                <TableHead className="text-right bg-background">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((item) => (
                <TableRow key={item.project_internal_id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{item.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-mono text-muted-foreground">
                      {item.external_project_id}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {item.total_responses}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.completed_responses}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.completion_rate_percentage.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right">
                    {item.failure_rate_percentage.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right">
                    {item.quota_full_hits}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={item.is_active ? "default" : "outline"}
                      className={
                        item.is_active
                          ? "border-transparent"
                          : "border-muted-foreground/40"
                      }
                    >
                      {item.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}