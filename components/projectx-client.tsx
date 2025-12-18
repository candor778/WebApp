"use client";

import { useState } from "react";
import { FolderKanban } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ProjectCard } from "@/components/project-card";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  responseCount: number;
}

interface ProjectsClientProps {
  projects: Project[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Case-sensitive filtering on project_id
  const filteredProjects = projects.filter((project) =>
    project.project_id.includes(searchQuery)
  );

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
        <h1 className="text-lg font-semibold">Projects</h1>
        <div className="ml-auto">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by Project ID (case-sensitive)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        {searchQuery && filteredProjects.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <FolderKanban className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No projects found</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              No projects match the search: "{searchQuery}"
            </p>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <FolderKanban className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No projects yet</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              Projects are auto-created when external surveys redirect users
              here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                serial={`CS-${index + 1}`}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
