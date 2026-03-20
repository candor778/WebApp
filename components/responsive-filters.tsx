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
  MapPin,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Project {
  id: string;
  project_id: string;
  title: string;
}

type FilterMode = "global" | "project";

export type SearchField =
  | "userId"
  | "country"
  | "countryCode"
  | "state"
  | "city";

const SEARCH_FIELD_OPTIONS: { value: SearchField; label: string }[] = [
  { value: "userId",      label: "User ID"      },
  { value: "country",     label: "Country"      },
  { value: "countryCode", label: "Country Code" },
  { value: "state",       label: "State"        },
  { value: "city",        label: "City"         },
];

// ── Hoisted prop interfaces ───────────────────────────────────────────────────

interface SearchBarProps {
  searchField: SearchField;
  setSearchField: (v: SearchField) => void;
  searchUserId: string;
  setSearchUserId: (v: string) => void;
  className?: string;
}

interface SearchChipProps {
  searchField: SearchField;
  searchUserId: string;
  setSearchUserId: (v: string) => void;
  variant?: "secondary" | "outline";
}

// ── Hoisted sub-components ────────────────────────────────────────────────────

function SearchBar({
  searchField,
  setSearchField,
  searchUserId,
  setSearchUserId,
  className,
}: SearchBarProps) {
  const currentLabel =
    SEARCH_FIELD_OPTIONS.find((o) => o.value === searchField)?.label ?? "User ID";

  return (
    <div className={cn("flex items-center gap-0", className)}>
      <Select
        value={searchField}
        onValueChange={(v) => {
          setSearchField(v as SearchField);
          setSearchUserId("");
        }}
      >
        <SelectTrigger
          className={cn(
            "h-9 shrink-0 rounded-r-none border-r-0 bg-muted/60 px-2.5 text-xs font-medium",
            "focus:ring-0 focus:ring-offset-0 w-[108px]"
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="start" className="min-w-[140px]">
          {SEARCH_FIELD_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-xs">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={`Search by ${currentLabel}…`}
          value={searchUserId}
          onChange={(e) => setSearchUserId(e.target.value)}
          className="h-9 rounded-l-none pl-8 pr-8 text-sm"
        />
        {searchUserId && (
          <button
            onClick={() => setSearchUserId("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

function SearchChip({
  searchField,
  searchUserId,
  setSearchUserId,
  variant = "secondary",
}: SearchChipProps) {
  if (!searchUserId) return null;

  const label =
    SEARCH_FIELD_OPTIONS.find((o) => o.value === searchField)?.label ?? "User ID";

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={() => setSearchUserId("")}
      className="h-7 rounded-full px-2 text-xs gap-1"
    >
      {searchField === "userId" ? (
        <User className="h-3 w-3" />
      ) : (
        <MapPin className="h-3 w-3" />
      )}
      {label}: {searchUserId.length > 12 ? searchUserId.slice(0, 12) + "…" : searchUserId}
      <X className="h-3 w-3" />
    </Button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface ResponsiveFiltersProps {
  searchUserId: string;
  setSearchUserId: (value: string) => void;
  searchField: SearchField;
  setSearchField: (value: SearchField) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  hasFilters: boolean;
  clearFilters: () => void;
  totalCount: number;
  isRefreshing: boolean;
  isLoading: boolean;
  handleRefresh: () => void;
  ExportButton: React.ComponentType<any>;
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
  projectId?: string;
}

export function ResponsiveFilters({
  searchUserId,
  setSearchUserId,
  searchField,
  setSearchField,
  selectedStatus,
  setSelectedStatus,
  hasFilters,
  clearFilters,
  totalCount,
  isRefreshing,
  isLoading,
  handleRefresh,
  ExportButton,
  mode = "global",
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
  // Each breakpoint gets its own open state so they never conflict with each other
  const [desktopComboOpen, setDesktopComboOpen] = useState(false);
  const [tabletComboOpen,  setTabletComboOpen]  = useState(false);
  const isGlobalMode = mode === "global";

  // Factory — returns combobox JSX wired to a specific close callback
  const makeComboContent = (closeCombo: () => void) => (
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
            setProjectSearchQuery?.("");
            closeCombo();
          }}
        >
          <Check
            className={cn(
              "mr-2 h-4 w-4",
              selectedProject === "all" || !selectedProject ? "opacity-100" : "opacity-0"
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
              setProjectSearchQuery?.("");
              closeCombo();
            }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                selectedProject === project.id ? "opacity-100" : "opacity-0"
              )}
            />
            <span className="truncate">{project.project_id}</span>
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  );

  const projectButtonLabel =
    selectedProject && selectedProject !== "all" && selectedProjectData
      ? selectedProjectData.project_id
      : "All Projects";

  const exportProps = isGlobalMode
    ? { selectedProject, selectedStatus, searchUserId, searchField, searchProjectId: "" }
    : { projectId, selectedStatus, searchUserId, searchField };

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          DESKTOP (lg+) — strictly one row, never wraps
          ════════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex items-center gap-2 mb-5">

        {/* Search bar */}
        <SearchBar
          searchField={searchField}
          setSearchField={setSearchField}
          searchUserId={searchUserId}
          setSearchUserId={setSearchUserId}
          className="w-[260px] shrink-0"
        />

        {/* Project combobox */}
        {isGlobalMode && (
          <Popover open={desktopComboOpen} onOpenChange={setDesktopComboOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-[185px] shrink-0 h-9 justify-between font-normal text-sm"
              >
                <span className="truncate">{projectButtonLabel}</span>
                <ChevronsUpDown className="ml-1 h-3.5 w-3.5 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-0" align="start">
              {makeComboContent(() => setDesktopComboOpen(false))}
            </PopoverContent>
          </Popover>
        )}

        {/* Status */}
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[145px] shrink-0 h-9 text-sm">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="TERMINATED">Terminated</SelectItem>
            <SelectItem value="STARTED">Started</SelectItem>
            <SelectItem value="QUOTA_FULL">Quota Full</SelectItem>
            <SelectItem value="QUALITY_TERMINATED">Quality Terminated</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear */}
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-9 shrink-0 px-2.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5 mr-1" />
            Clear
          </Button>
        )}

        {/* Flex spacer */}
        <div className="flex-1" />

        {/* Count */}
        <span className="shrink-0 text-xs font-medium text-muted-foreground whitespace-nowrap">
          {totalCount.toLocaleString()}{" "}
          {totalCount === 1 ? "respondent" : "respondents"}
        </span>

        {/* Export */}
        <div className="shrink-0">
          <ExportButton {...exportProps} />
        </div>

        {/* Refresh */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={isRefreshing || isLoading}
          className="shrink-0 h-9 w-9"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          TABLET (md–lg) — two clean rows, no sheet
          ════════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:flex lg:hidden flex-col gap-2 mb-5">
        {/* Row 1: all filter controls */}
        <div className="flex items-center gap-2">
          <SearchBar
            searchField={searchField}
            setSearchField={setSearchField}
            searchUserId={searchUserId}
            setSearchUserId={setSearchUserId}
            className="flex-1 min-w-0"
          />
          {isGlobalMode && (
            <Popover open={tabletComboOpen} onOpenChange={setTabletComboOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-[160px] shrink-0 h-9 justify-between font-normal text-sm"
                >
                  <span className="truncate">{projectButtonLabel}</span>
                  <ChevronsUpDown className="ml-1 h-3.5 w-3.5 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[220px] p-0" align="start">
                {makeComboContent(() => setTabletComboOpen(false))}
              </PopoverContent>
            </Popover>
          )}
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[138px] shrink-0 h-9 text-sm">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="TERMINATED">Terminated</SelectItem>
              <SelectItem value="STARTED">Started</SelectItem>
              <SelectItem value="QUOTA_FULL">Quota Full</SelectItem>
              <SelectItem value="QUALITY_TERMINATED">Quality Terminated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Row 2: count · chips · actions */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="shrink-0 text-xs font-medium text-muted-foreground whitespace-nowrap">
            {totalCount.toLocaleString()} {totalCount === 1 ? "respondent" : "respondents"}
          </span>

          {/* Active chips */}
          <div className="flex flex-1 flex-wrap items-center gap-1.5 min-w-0 overflow-hidden">
            <SearchChip searchField={searchField} searchUserId={searchUserId} setSearchUserId={setSearchUserId} />
            {isGlobalMode && selectedProject !== "all" && selectedProjectData && (
              <Button variant="secondary" size="sm" onClick={() => setSelectedProject?.("all")}
                className="h-7 rounded-full px-2 text-xs gap-1">
                {selectedProjectData.project_id}<X className="h-3 w-3" />
              </Button>
            )}
            {selectedStatus !== "all" && (
              <Button variant="secondary" size="sm" onClick={() => setSelectedStatus("all")}
                className="h-7 rounded-full px-2 text-xs gap-1">
                {selectedStatus}<X className="h-3 w-3" />
              </Button>
            )}
            {hasFilters && (
              <button onClick={clearFilters}
                className="text-[11px] text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors shrink-0">
                Clear all
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <ExportButton {...exportProps} />
            <Button variant="outline" size="icon" className="h-9 w-9"
              onClick={handleRefresh} disabled={isRefreshing || isLoading}>
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          MOBILE (<md) — search + sheet drawer
          ════════════════════════════════════════════════════════════════════ */}
      <div className="flex md:hidden flex-col gap-2 mb-5">
        {/* Row 1: search bar + sheet trigger */}
        <div className="flex items-center gap-2">
          <SearchBar
            searchField={searchField}
            setSearchField={setSearchField}
            searchUserId={searchUserId}
            setSearchUserId={setSearchUserId}
            className="flex-1 min-w-0"
          />

          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="relative h-9 w-9 shrink-0 rounded-lg"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {hasFilters && (
                  <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary">
                    <span className="h-2 w-2 rounded-full bg-primary-foreground" />
                  </span>
                )}
              </Button>
            </SheetTrigger>

            <SheetContent side="bottom"
              className="h-auto max-h-[78vh] rounded-t-3xl border-t bg-background px-0 pb-0">
              {/* Drag handle */}
              <div className="mx-auto mb-1 mt-3 h-1 w-10 rounded-full bg-muted-foreground/20" />

              <div className="px-5 pb-8 pt-2">
                <SheetHeader className="mb-5 space-y-0.5 text-left">
                  <SheetTitle className="text-base font-semibold">Filters</SheetTitle>
                  <SheetDescription className="text-xs">
                    {isGlobalMode
                      ? "Narrow by project, location and status."
                      : "Narrow by status."}
                  </SheetDescription>
                </SheetHeader>

                <div className="space-y-4">
                  {isGlobalMode && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Project
                      </p>
                      <Select value={selectedProject} onValueChange={setSelectedProject}>
                        <SelectTrigger className="h-11 w-full rounded-xl text-sm">
                          <SelectValue placeholder="All projects" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All projects</SelectItem>
                          {projects?.map((p) => (
                            <SelectItem key={p.id} value={p.id}>{p.project_id}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Status
                    </p>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="h-11 w-full rounded-xl text-sm">
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="TERMINATED">Terminated</SelectItem>
                        <SelectItem value="STARTED">Started</SelectItem>
                        <SelectItem value="QUOTA_FULL">Quota Full</SelectItem>
                        <SelectItem value="QUALITY_TERMINATED">Quality Terminated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Active chips inside sheet */}
                  {hasFilters && (
                    <div className="rounded-2xl border bg-muted/30 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Active filters
                        </p>
                        <button
                          onClick={() => { clearFilters(); setMobileFiltersOpen(false); }}
                          className="text-[11px] text-muted-foreground underline underline-offset-2 hover:text-foreground"
                        >
                          Clear all
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <SearchChip searchField={searchField} searchUserId={searchUserId} setSearchUserId={setSearchUserId} />
                        {isGlobalMode && selectedProject !== "all" && selectedProjectData && (
                          <Button variant="secondary" size="sm" onClick={() => setSelectedProject?.("all")}
                            className="h-7 rounded-full px-2 text-xs gap-1">
                            {selectedProjectData.project_id}<X className="h-3 w-3" />
                          </Button>
                        )}
                        {selectedStatus !== "all" && (
                          <Button variant="secondary" size="sm" onClick={() => setSelectedStatus("all")}
                            className="h-7 rounded-full px-2 text-xs gap-1">
                            {selectedStatus}<X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  <Button
                    className="h-12 w-full rounded-2xl text-sm font-semibold"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    Apply filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Row 2: count + export + refresh + active chips */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="shrink-0 text-xs font-medium text-muted-foreground whitespace-nowrap">
            {totalCount.toLocaleString()} {totalCount === 1 ? "respondent" : "respondents"}
          </span>

          {/* Active chips (overflow hidden on mobile) */}
          <div className="flex flex-1 flex-wrap items-center gap-1 min-w-0 overflow-hidden">
            <SearchChip searchField={searchField} searchUserId={searchUserId} setSearchUserId={setSearchUserId} variant="outline" />
            {isGlobalMode && selectedProject !== "all" && selectedProjectData && (
              <Button variant="outline" size="sm" onClick={() => setSelectedProject?.("all")}
                className="h-6 rounded-full border-dashed px-2 text-[11px] gap-1">
                {selectedProjectData.project_id}<X className="h-3 w-3" />
              </Button>
            )}
            {selectedStatus !== "all" && (
              <Button variant="outline" size="sm" onClick={() => setSelectedStatus("all")}
                className="h-6 rounded-full border-dashed px-2 text-[11px] gap-1">
                {selectedStatus}<X className="h-3 w-3" />
              </Button>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <ExportButton {...exportProps} />
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg"
              onClick={handleRefresh} disabled={isRefreshing || isLoading}>
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}