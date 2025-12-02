"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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
  const { toast } = useToast()

  const handleExport = async () => {
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

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleExport}
      disabled={isExporting}
    >
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
  )
}