"use client"
import { useState, useEffect, useCallback } from "react"
import useSWRInfinite from "swr/infinite"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Eye } from "lucide-react"
import { RespondentDetailDrawer } from "@/components/respondent-detail-drawer"
import { ExportButton } from "@/components/respondent-export-button"
import { ResponsiveFilters } from "@/components/responsive-filters"
import { DeleteRespondentButton } from "@/components/delete-respondent-button"
import { cn } from "@/lib/utils"
import { useToast } from "./ui/use-toast"

interface Respondent {
  id: string
  projectId: string
  userId?: string
  ipAddress: string | null
  deviceType: string | null
  browserName: string | null
  status: string
  createdAt: string
  completedAt: string | null
  respondentName: string
  respondentEmail: string | null
  respondentPhone: string
}

interface ProjectRespondentsListProps {
  projectId: string
  projectIdLabel?: string
}

const PAGE_SIZE = 50
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function ProjectRespondentsList({ projectId, projectIdLabel }: ProjectRespondentsListProps) {
  const [selectedRespondent, setSelectedRespondent] = useState<Respondent | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchUserId, setSearchUserId] = useState<string>("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()

  const buildUrl = (pageIndex: number) => {
    const params = new URLSearchParams()
    params.set("offset", String(pageIndex * PAGE_SIZE))
    params.set("limit", String(PAGE_SIZE))
    if (selectedStatus && selectedStatus !== "all") params.set("status", selectedStatus)
    if (searchUserId.trim()) params.set("userId", searchUserId.trim())
    return `/api/projects/${projectId}/respondents?${params.toString()}`
  }

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.pagination.hasMore) return null
    return buildUrl(pageIndex)
  }

  const { data, error, size, setSize, isLoading, isValidating, mutate } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
  })

  // Reset pagination when filters change
  useEffect(() => {
    setSize(1)
    mutate()
  }, [selectedStatus, searchUserId, setSize, mutate])

  const respondents: Respondent[] = data ? data.flatMap((page) => page.respondents) : []
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined")
  const isEmpty = data?.[0]?.respondents?.length === 0
  const hasMore = data?.[data.length - 1]?.pagination?.hasMore
  const totalCount = data?.[0]?.pagination?.total || 0

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
      if (hasMore && !isValidating) {
        setSize(size + 1)
      }
    }
  }, [hasMore, isValidating, setSize, size])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const viewDetails = (respondent: Respondent) => {
    setSelectedRespondent(respondent)
    setDrawerOpen(true)
  }

  const clearFilters = () => {
    setSelectedStatus("all")
    setSearchUserId("")
  }

  const hasFilters = selectedStatus !== "all" || searchUserId.trim() !== ""

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await mutate()
      toast({
        title: "Refreshed",
        description: "Respondent list has been updated.",
      })
    } catch (error) {
      console.error("Refresh error:", error)
      toast({
        title: "Error",
        description: "Failed to refresh data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <Badge className="bg-green-600 hover:bg-green-700">Completed</Badge>
      case "TERMINATED":
        return <Badge variant="destructive">Terminated</Badge>
      case "STARTED":
        return <Badge variant="secondary">Started</Badge>
      case "QUOTA_FULL":
        return <Badge className="bg-yellow-500 hover:bg-amber-600 text-black">Quota Full</Badge>  
      case "QUALITY_TERMINATED":
        return <Badge className="bg-blue-500  text-black">Quality_Terminated</Badge>;
        default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12 px-4">
        <div className="text-center space-y-2">
          <p className="text-destructive font-medium">Failed to load respondents</p>
          <p className="text-sm text-muted-foreground">Please try again or contact support</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Responsive Filters */}
      <ResponsiveFilters
        mode="project"
        projectId={projectId}
        searchUserId={searchUserId}
        setSearchUserId={setSearchUserId}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
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
              <Button variant="link" onClick={clearFilters} className="h-auto p-0">
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
                <TableHead className="font-semibold">IP Address</TableHead>
                <TableHead className="font-semibold">Device</TableHead>
                <TableHead className="font-semibold">Click Time</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
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
                    title={respondent.userId || respondent.respondentName}
                  >
                    {respondent.userId || respondent.respondentName}
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
                      ? respondent.deviceType.charAt(0) + respondent.deviceType.slice(1).toLowerCase()
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
                      {/* <DeleteRespondentButton 
                        id={respondent.id} 
                        onDeleteSuccess={() => mutate()}
                      /> */}
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
          <Button variant="outline" onClick={() => setSize(size + 1)} className="min-w-[120px]">
            Load More
          </Button>
        </div>
      )}

      <RespondentDetailDrawer
        respondent={selectedRespondent}
        surveyId={projectId}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </>
  )
}