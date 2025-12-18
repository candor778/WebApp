// components/project-card.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, Calendar, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ToggleProjectButton } from "./toggle-project-button";
import { DeleteProjectButton } from "./delete-project-button";

interface ProjectRowProps {
  project: {
    id: string;
    project_id: string;
    title: string;
    description: string | null;
    is_active: boolean;
    created_at: string;
    responseCount?: number;
  };
  serial: string;
}

export function ProjectCard({ project, serial }: ProjectRowProps) {
  const router = useRouter();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsExporting(true);
    try {
      const res = await fetch(`/api/projects/${project.id}/export`);
      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${project.project_id}_responses_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;

      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Export successful");
    } catch {
      toast.error("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      onClick={() => router.push(`/projects/${project.id}`)}
      className="group flex items-center gap-4 rounded-xl border-2 border-gray-200 px-4 py-3 
                 hover:border-[#1b3750]/30 hover:bg-[#1b3750]/5 hover:shadow-md 
                 transition-all cursor-pointer"
    >
      {/* Serial */}
      <div className="w-16 shrink-0">
        <span className="inline-flex items-center justify-center rounded-md bg-[#1b3750]/10 px-2 py-1 text-xs font-mono font-semibold text-black">
          {serial}
        </span>
      </div>

      {/* Project Info */}
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#1b3750]/70 bg-[#1b3750]/10 px-2 py-0.5 rounded font-medium">
            {project.project_id}
          </span>
          <Badge
            variant={project.is_active ? "default" : "secondary"}
            className={project.is_active ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {project.is_active ? "Active" : "Inactive"}
          </Badge>
        </div>

        <p className="truncate text-sm font-semibold text-[#1b3750]">
          {project.title}
        </p>
      </div>

      {/* Created Date */}
      <div className="hidden md:flex items-center gap-2 text-sm min-w-[140px]">
        <Calendar className="h-4 w-4 text-[#1b3750]/60" />
        <span className="text-[#1b3750]/70">
          {new Date(project.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Responses */}
      <div className="flex items-center gap-2 min-w-[120px] px-3 py-1 rounded-lg 
                      bg-[#1b3750]/5 border border-[#1b3750]/10">
        <Users className="h-4 w-4 text-[#1b3750]" />
        <span className="font-bold text-lg text-[#1b3750]">
          {project.responseCount ?? 0}
        </span>
        <span className="text-sm text-[#1b3750]/60">
          {project.responseCount === 1 ? "response" : "responses"}
        </span>
      </div>

      {/* Toggle */}
      <div onClick={(e) => e.stopPropagation()}>
        <ToggleProjectButton id={project.id} isActive={project.is_active} />
      </div>

      {/* Actions */}
      <div
        className="flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          size="icon"
          variant="outline"
          className="hover:bg-[#1b3750] hover:text-white hover:border-[#1b3750]"
        >
          <Eye className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="outline"
          onClick={handleExport}
          disabled={isExporting || !project.responseCount}
          className="hover:bg-blue-600 hover:text-white hover:border-blue-600 disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
        </Button>

        <DeleteProjectButton id={project.id} />
      </div>
    </div>
  );
}
