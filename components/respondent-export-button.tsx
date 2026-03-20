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

// Must stay in sync with SearchField in responsive-filters.tsx
type SearchField = "userId" | "country" | "countryCode" | "state" | "city"

// Maps camelCase UI field → actual DB column name sent to the API
const GEO_COLUMN_MAP: Record<string, string> = {
  country:     "country",
  countryCode: "country_code",
  state:       "state",
  city:        "city",
}

interface ExportButtonProps {
  projectId?:      string
  selectedProject?: string
  selectedStatus?:  string
  searchUserId?:    string
  searchField?:     SearchField
  searchProjectId?: string
  variant?: "outline" | "default" | "secondary" | "ghost" | "link" | "destructive"
  size?:    "default" | "sm" | "lg" | "icon"
}

export function ExportButton({
  projectId,
  selectedProject,
  selectedStatus,
  searchUserId,
  searchField = "userId",
  searchProjectId,
  variant = "outline",
  size = "sm",
}: ExportButtonProps) {
  const [isExporting, setIsExporting]     = useState(false)
  const [showDateDialog, setShowDateDialog] = useState(false)
  const [startDate, setStartDate]         = useState("")
  const [endDate, setEndDate]             = useState("")
  const { toast } = useToast()

  const handleExport = async (includeDate = false) => {
    setIsExporting(true)
    try {
      let endpoint: string

      if (projectId) {
        // ── Project-specific export ──────────────────────────────────
        // Route file lives at /api/projects/[id]/export/route.ts
        endpoint = `/api/projects/${projectId}/export`
        const params = new URLSearchParams()

        if (selectedStatus && selectedStatus !== "all")
          params.set("status", selectedStatus)

        // userId is case-sensitive; geo fields go as geoField/geoValue
        if (searchUserId?.trim()) {
          if (searchField === "userId") {
            params.set("userId", searchUserId.trim())
          } else {
            params.set("geoField", GEO_COLUMN_MAP[searchField] ?? searchField)
            params.set("geoValue", searchUserId.trim())
          }
        }

        if (includeDate && startDate && endDate) {
          params.set("startDate", startDate)
          params.set("endDate",   endDate)
        }
        if (params.toString()) endpoint += `?${params.toString()}`

      } else {
        // ── Global export ────────────────────────────────────────────
        endpoint = `/api/respondents/export`
        const params = new URLSearchParams()

        if (selectedProject && selectedProject !== "all")
          params.set("projectId", selectedProject)
        if (selectedStatus && selectedStatus !== "all")
          params.set("status", selectedStatus)

        // userId is case-sensitive; geo fields go as geoField/geoValue
        if (searchUserId?.trim()) {
          if (searchField === "userId") {
            params.set("userId", searchUserId.trim())
          } else {
            params.set("geoField", GEO_COLUMN_MAP[searchField] ?? searchField)
            params.set("geoValue", searchUserId.trim())
          }
        }

        if (searchProjectId?.trim())
          params.set("searchProjectId", searchProjectId.trim())
        if (includeDate && startDate && endDate) {
          params.set("startDate", startDate)
          params.set("endDate",   endDate)
        }
        if (params.toString()) endpoint += `?${params.toString()}`
      }

      const response = await fetch(endpoint)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
        console.error("Export failed:", response.status, errorData)
        throw new Error(`Failed to export data: ${errorData.error || response.statusText}`)
      }

      const contentDisposition = response.headers.get("Content-Disposition")
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/)
      const filename = filenameMatch ? filenameMatch[1] : `responses_${Date.now()}.xlsx`

      const blob = await response.blob()
      const url  = window.URL.createObjectURL(blob)
      const a    = document.createElement("a")
      a.href     = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title:       "Export successful",
        description: "Your data has been exported to Excel.",
      })

      if (includeDate) {
        setShowDateDialog(false)
        setStartDate("")
        setEndDate("")
      }
    } catch (error) {
      console.error("Export error:", error)
      toast({
        title:       "Export failed",
        description: "Failed to export data. Please try again.",
        variant:     "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleDateExport = () => {
    if (!startDate || !endDate) {
      toast({
        title:       "Invalid date range",
        description: "Please select both start and end dates.",
        variant:     "destructive",
      })
      return
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast({
        title:       "Invalid date range",
        description: "Start date must be before end date.",
        variant:     "destructive",
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