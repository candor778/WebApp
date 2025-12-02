"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExportButtonProps {
  projectId?: string
  variant?: "outline" | "default" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
}

export function ExportButton({ projectId, variant = "outline", size = "sm" }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const handleExport = async () => {
    setIsExporting(true)
    try {
      // Use project-specific endpoint if projectId provided
      const endpoint = projectId ? `/api/projects/${projectId}/export` : `/api/respondents/export`

      const response = await fetch(endpoint)

      if (!response.ok) {
        throw new Error("Failed to export data")
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
    <Button variant={variant} size={size} onClick={handleExport} disabled={isExporting}>
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
