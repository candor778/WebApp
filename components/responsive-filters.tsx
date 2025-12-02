// components/responsive-filters.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Search,
  X,
  ChevronsUpDown,
  Check,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Project {
  id: string;
  project_id: string;
  title: string;
}

type FilterMode = 'global' | 'project';

interface ResponsiveFiltersProps {
  searchUserId: string;
  setSearchUserId: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  hasFilters: boolean;
  clearFilters: () => void;
  totalCount: number;
  isRefreshing: boolean;
  isLoading: boolean;
  handleRefresh: () => void;
  ExportButton: React.ComponentType<any>;
  
  // Optional - only for global mode
  mode?: FilterMode;
  selectedProject?: string;
  setSelectedProject?: (value: string) => void;
  selectedProjectData?: Project | undefined;
  projects?: Project[];
  filteredProjects?: Project[];
  projectSearchQuery?: string;
  setProjectSearchQuery?: (value: string) => void;
  projectComboOpen?: boolean;
  setProjectComboOpen?: (value: boolean) => void;
  
  // Optional - only for project mode
  projectId?: string;
}

export function ResponsiveFilters({
  searchUserId,
  setSearchUserId,
  selectedStatus,
  setSelectedStatus,
  hasFilters,
  clearFilters,
  totalCount,
  isRefreshing,
  isLoading,
  handleRefresh,
  ExportButton,
  mode = 'global',
  selectedProject,
  setSelectedProject,
  selectedProjectData,
  projects,
  filteredProjects,
  projectSearchQuery,
  setProjectSearchQuery,
  projectComboOpen,
  setProjectComboOpen,
  projectId,
}: ResponsiveFiltersProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const isGlobalMode = mode === 'global';

  return (
    <>
      {/* Desktop Filters - Hidden on Mobile */}
      <div className="hidden md:flex items-center gap-3 mb-6 flex-wrap">
        {/* User ID Search */}
        <div className="relative w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search User ID..."
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
            className="pl-9 pr-8"
          />
          {searchUserId && (
            <button
              onClick={() => setSearchUserId("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Project Filter with Search - Only in Global Mode */}
        {isGlobalMode && (
          <Popover open={projectComboOpen} onOpenChange={setProjectComboOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={projectComboOpen}
                className="w-[280px] justify-between font-normal"
              >
                {selectedProject &&
                selectedProject !== "all" &&
                selectedProjectData
                  ? `${selectedProjectData.project_id} - ${selectedProjectData.title}`
                  : "All Projects"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-0" align="start">
              <Command>
                <CommandInput
                  placeholder="Search projects..."
                  value={projectSearchQuery}
                  onValueChange={setProjectSearchQuery}
                />
                <CommandEmpty>No project found.</CommandEmpty>
                <CommandGroup className="max-h-[calc(5*2.5rem)] overflow-auto">
                  <CommandItem
                    value="all"
                    onSelect={() => {
                      setSelectedProject?.("all");
                      setProjectComboOpen?.(false);
                      setProjectSearchQuery?.("");
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedProject === "all" || !selectedProject
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    All Projects
                  </CommandItem>
                  {filteredProjects?.map((project) => (
                    <CommandItem
                      key={project.id}
                      value={`${project.project_id} ${project.title}`}
                      onSelect={() => {
                        setSelectedProject?.(project.id);
                        setProjectComboOpen?.(false);
                        setProjectSearchQuery?.("");
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedProject === project.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <span className="truncate">{project.project_id}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        )}

        {/* Status Filter */}
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="TERMINATED">Terminated</SelectItem>
            <SelectItem value="STARTED">Started</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-10"
          >
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        )}

        {/* Right Side Actions */}
        <div className="ml-auto flex items-center gap-3">
          <div
            title={`${totalCount.toLocaleString()} ${
              totalCount === 1 ? "respondent" : "respondents"
            }`}
            className="text-xs text-muted-foreground font-medium"
          >
            {totalCount.toLocaleString()}{" "}
            {totalCount === 1 ? "respondent" : "respondents"}
          </div>
          <ExportButton
            {...(isGlobalMode ? {
              selectedProject: selectedProject,
              selectedStatus: selectedStatus,
              searchUserId: searchUserId,
              searchProjectId: "",
            } : {
              projectId: projectId,
              selectedStatus: selectedStatus,
              searchUserId: searchUserId,
            })}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-1 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden mb-6 space-y-3">
        {/* Container card */}
        <div className="rounded-xl border bg-background/80 px-3 py-3 shadow-sm space-y-3">
          {/* Top Row - Search + Filters */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by User ID"
                value={searchUserId}
                onChange={(e) => setSearchUserId(e.target.value)}
                className="h-9 rounded-lg pl-9 pr-9 text-sm"
              />
              {searchUserId && (
                <button
                  onClick={() => setSearchUserId("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Filter Sheet Trigger */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 shrink-0 rounded-lg border-dashed relative"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  {hasFilters && (
                    <span className="absolute -top-1 -right-1 inline-flex h-3 w-3 items-center justify-center rounded-full bg-primary">
                      <span className="h-2 w-2 rounded-full bg-primary-foreground" />
                    </span>
                  )}
                </Button>
              </SheetTrigger>

              <SheetContent
                side="bottom"
                className="h-[82vh] px-4 rounded-t-2xl border-t bg-background/95 pb-6"
              >
                <SheetHeader className="space-y-1 pb-2">
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    {isGlobalMode 
                      ? "Refine respondents by project and status."
                      : "Refine respondents by status."}
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-4 space-y-5">
                  {/* Project Filter - Only in Global Mode */}
                  {isGlobalMode && (
                    <div className="space-y-1.5">
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Project
                      </span>
                      <Select
                        value={selectedProject}
                        onValueChange={setSelectedProject}
                      >
                        <SelectTrigger className="h-9 w-full rounded-lg text-sm">
                          <SelectValue placeholder="All projects" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All projects</SelectItem>
                          {projects?.map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              {project.project_id}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Status Filter */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Status
                    </span>
                    <Select
                      value={selectedStatus}
                      onValueChange={setSelectedStatus}
                    >
                      <SelectTrigger className="h-9 rounded-lg text-sm w-full">
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="TERMINATED">Terminated</SelectItem>
                        <SelectItem value="STARTED">Started</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Active Filters Summary */}
                  {hasFilters && (
                    <div className="rounded-lg border bg-muted/40 px-3 py-2.5 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Active filters
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={() => {
                            clearFilters();
                            setMobileFiltersOpen(false);
                          }}
                        >
                          Clear all
                        </Button>
                      </div>

                      {/* Chips inside sheet */}
                      <div className="flex flex-wrap gap-1.5">
                        {searchUserId && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setSearchUserId("")}
                            className="h-7 rounded-full px-2 text-xs"
                          >
                            User: {searchUserId.slice(0, 15)}
                            {searchUserId.length > 15 ? "..." : ""}
                            <X className="ml-1 h-3 w-3" />
                          </Button>
                        )}
                        {isGlobalMode && selectedProject !== "all" && selectedProjectData && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setSelectedProject?.("all")}
                            className="h-7 rounded-full px-2 text-xs"
                          >
                            {selectedProjectData.project_id}
                            <X className="ml-1 h-3 w-3" />
                          </Button>
                        )}
                        {selectedStatus !== "all" && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setSelectedStatus("all")}
                            className="h-7 rounded-full px-2 text-xs"
                          >
                            {selectedStatus}
                            <X className="ml-1 h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Apply Button */}
                  <Button
                    className="mt-2 w-full h-10 rounded-lg text-sm font-medium"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    Apply filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Bottom Row - Stats and Actions */}
          <div className="flex items-center justify-between pt-1">
            <div className="text-xs font-medium text-muted-foreground">
              {totalCount.toLocaleString()}{" "}
              {totalCount === 1 ? "respondent" : "respondents"}
            </div>

            <div className="flex items-center gap-1.5">
              <ExportButton
                {...(isGlobalMode ? {
                  selectedProject: selectedProject,
                  selectedStatus: selectedStatus,
                  searchUserId: searchUserId,
                  searchProjectId: "",
                } : {
                  projectId: projectId,
                  selectedStatus: selectedStatus,
                  searchUserId: searchUserId,
                })}
              />
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-lg"
                onClick={handleRefresh}
                disabled={isRefreshing || isLoading}
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters Chips (inline under card) */}
        {hasFilters && (
          <div className="flex flex-wrap gap-1.5 px-1">
            {searchUserId && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchUserId("")}
                className="h-7 rounded-full border-dashed px-2 text-xs"
              >
                User: {searchUserId.slice(0, 15)}
                {searchUserId.length > 15 ? "..." : ""}
                <X className="ml-1 h-3 w-3" />
              </Button>
            )}
            {isGlobalMode && selectedProject !== "all" && selectedProjectData && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedProject?.("all")}
                className="h-7 rounded-full border-dashed px-2 text-xs"
              >
                {selectedProjectData.project_id}
                <X className="ml-1 h-3 w-3" />
              </Button>
            )}
            {selectedStatus !== "all" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedStatus("all")}
                className="h-7 rounded-full border-dashed px-2 text-xs"
              >
                {selectedStatus}
                <X className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
}