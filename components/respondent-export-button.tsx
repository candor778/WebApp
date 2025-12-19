"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ExportButtonProps {
  projectId?: string
  selectedProject?: string
  selectedStatus?: string
  searchUserId?: string
  searchProjectId?: string
  variant?: "outline" | "default" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
}

export function ExportButton({ 
  projectId, 
  selectedProject,
  selectedStatus,
  searchUserId,
  searchProjectId,
  variant = "outline", 
  size = "sm" 
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [showDateDialog, setShowDateDialog] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const { toast } = useToast()

  const handleExport = async (includeDate: boolean = false) => {
    setIsExporting(true)
    try {
      let endpoint: string
      
      // Use project-specific endpoint if projectId is provided
      if (projectId) {
        endpoint = `/api/projects/${projectId}/respondents/export`
        
        // Add filters as query parameters for project-specific export
        const params = new URLSearchParams()
        if (selectedStatus && selectedStatus !== "all") {
          params.set("status", selectedStatus)
        }
        if (searchUserId && searchUserId.trim()) {
          params.set("userId", searchUserId.trim())
        }
        if (projectId && projectId.trim()) {
          params.set("projectId", projectId.trim())
        }
        
        // Add date parameters if filtering by date
        if (includeDate && startDate && endDate) {
          params.set("startDate", startDate)
          params.set("endDate", endDate)
        }
        
        if (params.toString()) {
          endpoint += `?${params.toString()}`
        }
      } else {
        // Use global endpoint
        endpoint = `/api/respondents/export`
        
        // Add filters as query parameters for global export
        const params = new URLSearchParams()
        if (selectedProject && selectedProject !== "all") {
          params.set("projectId", selectedProject)
        }
        if (selectedStatus && selectedStatus !== "all") {
          params.set("status", selectedStatus)
        }
        if (searchUserId && searchUserId.trim()) {
          params.set("userId", searchUserId.trim())
        }
        if (searchProjectId && searchProjectId.trim()) {
          params.set("searchProjectId", searchProjectId.trim())
        }
        
        // Add date parameters if filtering by date
        if (includeDate && startDate && endDate) {
          params.set("startDate", startDate)
          params.set("endDate", endDate)
        }
        
        if (params.toString()) {
          endpoint += `?${params.toString()}`
        }
      }
      
      const response = await fetch(endpoint)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('Export failed:', response.status, errorData)
        throw new Error(`Failed to export data: ${errorData.error || response.statusText}`)
      }

      // Get the filename from the Content-Disposition header
      const contentDisposition = response.headers.get("Content-Disposition")
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/)
      const filename = filenameMatch ? filenameMatch[1] : `responses_${Date.now()}.xlsx`

      // Create a blob from the response
      const blob = await response.blob()
      
      // Create a download link and trigger it
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      
      // Cleanup
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Export successful",
        description: "Your data has been exported to Excel.",
      })

      // Close dialog and reset dates if it was a date export
      if (includeDate) {
        setShowDateDialog(false)
        setStartDate("")
        setEndDate("")
      }
    } catch (error) {
      console.error("Export error:", error)
      toast({
        title: "Export failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleDateExport = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Invalid date range",
        description: "Please select both start and end dates.",
        variant: "destructive",
      })
      return
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast({
        title: "Invalid date range",
        description: "Start date must be before end date.",
        variant: "destructive",
      })
      return
    }

    handleExport(true)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size} disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleExport(false)}>
            <Download className="mr-2 h-4 w-4" />
            Export All
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowDateDialog(true)}>
            <Calendar className="mr-2 h-4 w-4" />
            Export by Date Range
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showDateDialog} onOpenChange={setShowDateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export by Date Range</DialogTitle>
            <DialogDescription>
              Select the date range for responses you want to export.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleDateExport} disabled={isExporting}>
              {isExporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}