"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, X, Search, RefreshCw, Trash2, Delete } from "lucide-react";
import { RespondentDetailDrawer } from "@/components/respondent-detail-drawer";
import { ExportButton } from "@/components/respondent-export-button";
import Link from "next/link";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { ResponsiveFilters } from "./responsive-filters";
import { toast as sonnerToast } from "sonner";
import { DeleteProjectButton } from "./delete-project-button";
import { DeleteRespondentButton } from "./delete-respondent-button";

interface Project {
  id: string;
  project_id: string;
  title: string;
}
interface Respondent {
  id: string;
  surveyId: string;
  projectId: string;
  projectTitle: string;
  ipAddress: string | null;
  deviceType: string | null;
  browserName: string | null;
  status: string;
  createdAt: string;
  completedAt: string | null;
  respondentName: string;
  respondentEmail: string | null;
  respondentPhone: string;
  answerCount: number;
}
interface GlobalRespondentsListProps {
  projects: Project[];
}
const PAGE_SIZE = 50;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function GlobalRespondentsList({
  projects,
}: GlobalRespondentsListProps) {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [searchUserId, setSearchUserId] = useState<string>("");
  const [projectSearchQuery, setProjectSearchQuery] = useState<string>("");
  const [selectedRespondent, setSelectedRespondent] =
    useState<Respondent | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [projectComboOpen, setProjectComboOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [respondentToDelete, setRespondentToDelete] = useState<Respondent | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!projectSearchQuery.trim()) return projects;
    const query = projectSearchQuery.toLowerCase();
    return projects.filter(
      (project) =>
        project.project_id.toLowerCase().includes(query) ||
        project.title.toLowerCase().includes(query)
    );
  }, [projects, projectSearchQuery]);

  const buildUrl = (pageIndex: number) => {
    const params = new URLSearchParams();
    params.set("offset", String(pageIndex * PAGE_SIZE));
    params.set("limit", String(PAGE_SIZE));
    if (selectedProject && selectedProject !== "all")
      params.set("projectId", selectedProject);
    if (selectedStatus && selectedStatus !== "all")
      params.set("status", selectedStatus);
    if (searchUserId.trim()) params.set("userId", searchUserId.trim());
    return `/api/respondents?${params.toString()}`;
  };

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.pagination.hasMore) return null;
    return buildUrl(pageIndex);
  };

  const { data, error, size, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite(getKey, fetcher, {
      revalidateFirstPage: false,
    });

  // Reset pagination when filters change
  useEffect(() => {
    setSize(1);
    mutate();
  }, [selectedProject, selectedStatus, searchUserId, setSize, mutate]);

  const respondents: Respondent[] = data
    ? data.flatMap((page) => page.respondents)
    : [];

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.respondents?.length === 0;
  const hasMore = data?.[data.length - 1]?.pagination?.hasMore;
  const totalCount = data?.[0]?.pagination?.total || 0;

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (hasMore && !isValidating) {
        setSize(size + 1);
      }
    }
  }, [hasMore, isValidating, setSize, size]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const viewDetails = (respondent: Respondent) => {
    setSelectedRespondent({
      ...respondent,
      projectId: respondent.projectId,
    } as any);
    setDrawerOpen(true);
  };

  const handleDeleteClick = (respondent: Respondent) => {
    setRespondentToDelete(respondent);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!respondentToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/respondents/${respondentToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete respondent");
      }

      sonnerToast.success("Respondent deleted successfully");
      
      // Refresh the data
      await mutate();
    } catch (error) {
      console.error("Error deleting respondent:", error);
      sonnerToast.error("Failed to delete respondent");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setRespondentToDelete(null);
    }
  };

  const clearFilters = () => {
    setSelectedProject("");
    setSelectedStatus("");
    setSearchUserId("");
    setProjectSearchQuery("");
  };

  const hasFilters =
    (selectedProject && selectedProject !== "all") ||
    (selectedStatus && selectedStatus !== "all") ||
    searchUserId.trim() !== "";

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge className="bg-green-600 hover:bg-green-700">Completed</Badge>
        );
      case "TERMINATED":
        return <Badge variant="destructive">Terminated</Badge>;
      case "QUOTA_FULL":
        return <Badge className="bg-yellow-500 text-black">Quota Full</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getProgressDisplay = (status: string, answerCount: number) => {
    if (status === "COMPLETED") return "100%";
    if (status === "QUOTA_FULL") return "Quota Full";
    if (status === "TERMINATED") return "Terminated";

    return "-";
  };

  const selectedProjectData = projects.find((p) => p.id === selectedProject);

  if (error) {
    return (
      <div className="flex items-center justify-center py-12 px-4">
        <div className="text-center space-y-2">
          <p className="text-destructive font-medium">
            Failed to load respondents
          </p>
          <p className="text-sm text-muted-foreground">
            Please try again or contact support
          </p>
        </div>
      </div>
    );
  }

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await mutate();
      toast({
        title: "Refreshed",
        description: "Respondent list has been updated.",
      });
    } catch (error) {
      console.error("Refresh error:", error);
      toast({
        title: "Error",
        description: "Failed to refresh data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <>
      <ResponsiveFilters
        searchUserId={searchUserId}
        setSearchUserId={setSearchUserId}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        selectedProjectData={selectedProjectData}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        projects={projects}
        filteredProjects={filteredProjects}
        projectSearchQuery={projectSearchQuery}
        setProjectSearchQuery={setProjectSearchQuery}
        projectComboOpen={projectComboOpen}
        setProjectComboOpen={setProjectComboOpen}
        hasFilters={hasFilters}
        clearFilters={clearFilters}
        totalCount={totalCount}
        isRefreshing={isRefreshing}
        isLoading={isLoading}
        handleRefresh={handleRefresh}
        ExportButton={ExportButton}
      />

      {isEmpty ? (
        <div className="flex items-center justify-center py-16 px-4 border rounded-lg bg-muted/20">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              No respondents found{hasFilters ? " matching your filters" : ""}
            </p>
            {hasFilters && (
              <Button
                variant="link"
                onClick={clearFilters}
                className="h-auto p-0"
              >
                Clear filters to see all respondents
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-lg border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">User ID</TableHead>
                <TableHead className="font-semibold">Project ID</TableHead>
                <TableHead className="font-semibold">IP Address</TableHead>
                <TableHead className="font-semibold">Device</TableHead>
                <TableHead className="font-semibold">Click Time</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Progress</TableHead>
                <TableHead className="font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {respondents.map((respondent, index) => (
                <TableRow
                  key={respondent.id}
                  className={cn(
                    "hover:bg-muted/50 transition-colors",
                    index % 2 === 0 ? "bg-background" : "bg-muted/20"
                  )}
                >
                  <TableCell 
                    className="font-mono text-xs font-medium max-w-[200px] truncate"
                    title={respondent.respondentName}
                  >
                    {respondent.respondentName}
                  </TableCell>
                  <TableCell className="max-w-[150px]">
                    <Link
                      href={`/projects/${respondent.surveyId}`}
                      className="font-mono text-xs text-primary hover:underline underline-offset-4 transition-colors truncate block"
                      title={respondent.projectId}
                    >
                      {respondent.projectId}
                    </Link>
                  </TableCell>
                  <TableCell 
                    className="text-sm text-muted-foreground max-w-[120px] truncate"
                    title={respondent.ipAddress || "Unknown"}
                  >
                    {respondent.ipAddress || "Unknown"}
                  </TableCell>
                  <TableCell 
                    className="text-sm max-w-[100px] truncate"
                    title={respondent.deviceType || "Unknown"}
                  >
                    {respondent.deviceType
                      ? respondent.deviceType.charAt(0) +
                        respondent.deviceType.slice(1).toLowerCase()
                      : "Unknown"}
                  </TableCell>
                  <TableCell 
                    className="text-sm text-muted-foreground max-w-[180px] truncate whitespace-nowrap"
                    title={new Date(respondent.createdAt).toLocaleString()}
                  >
                    {new Date(respondent.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getStatusBadge(respondent.status)}
                  </TableCell>
                  <TableCell className="text-sm font-medium whitespace-nowrap">
                    {getProgressDisplay(
                      respondent.status,
                      respondent.answerCount
                    )}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewDetails(respondent)}
                        className="hover:bg-primary/10"
                        title="View respondent details"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                      {/* <DeleteRespondentButton id={respondent.id} /> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {(isLoadingMore || isLoading) && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}

      {hasMore && !isLoadingMore && (
        <div className="flex justify-center py-6">
          <Button
            variant="outline"
            onClick={() => setSize(size + 1)}
            className="min-w-[120px]"
          >
            Load More
          </Button>
        </div>
      )}

      <RespondentDetailDrawer
        respondent={
          selectedRespondent
            ? {
                ...selectedRespondent,
                projectId: selectedRespondent.projectId,
              }
            : null
        }
        surveyId={selectedRespondent?.surveyId || ""}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Respondent?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the response from{" "}
              <strong>{respondentToDelete?.respondentName}</strong> for project{" "}
              <strong>{respondentToDelete?.projectId}</strong>. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete Respondent"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}