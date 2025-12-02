// components/project-card.tsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Eye, Trash2, Download, Calendar, Users } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { DeleteProjectButton } from "./delete-project-button"

interface ProjectCardProps {
  project: {
    id: string
    project_id: string
    title: string
    description: string | null
    is_active: boolean
    created_at: string
    responseCount?: number
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete project")
      }

      toast.success("Project deleted successfully")
      router.refresh()
    } catch (error) {
      console.error("Error deleting project:", error)
      toast.error("Failed to delete project")
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  const handleExport = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsExporting(true)
    try {
      const response = await fetch(`/api/projects/${project.id}/export`)

      if (!response.ok) {
        throw new Error("Failed to export data")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${project.project_id}_responses_${new Date().toISOString().split("T")[0]}.xlsx`
      document.body.appendChild(a)
      a.click()
      
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast.success("Data exported successfully")
    } catch (error) {
      console.error("Error exporting data:", error)
      toast.error("Failed to export data")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <>
      <Card className="flex flex-col h-full hover:shadow-lg transition-all border-2 hover:border-primary/30 group cursor-pointer"
        onClick={(e) => {
          // Navigate to project detail page when card is clicked
          // But only if not clicking on action buttons
          if (!(e.target as HTMLElement).closest('button')) {
            router.push(`/projects/${project.id}`)
          }
        }}
      >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-muted-foreground/80 bg-muted px-2 py-1 rounded truncate block">
                    {project.project_id}
                  </span>
                  <Badge
                    variant={project.is_active ? "default" : "secondary"}
                    className={`${project.is_active ? "bg-green-600 hover:bg-green-700" : ""} text-xs`}
                  >
                    {project.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <CardTitle
                  className="truncate text-wrap break-words text-lg font-semibold group-hover:text-primary transition-colors"
                  title={project.title}
                >
                  {project.title}
                </CardTitle>
                <CardDescription
                  className="line-clamp-2 text-wrap break-words text-sm mt-2"
                  title={project.description || "No description"}
                >
                  {project.description || "No description provided"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 pb-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{new Date(project.created_at).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</span>
              </div>
              
              <div className="flex items-center gap-2 pt-2 border-t">
                <Users className="h-5 w-5 text-primary" />
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    {project.responseCount ?? 0}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {project.responseCount === 1 ? "respondent" : "respondents"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          
          <div className="flex items-center gap-2 px-6 pb-4 pt-2 border-t bg-muted/20">
            <Button 
              size="sm" 
              variant="outline"
              className="flex-1 group-hover:bg-background"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation()
                router.push(`/projects/${project.id}`)
              }}
            >
              <Eye className="h-4 w-4 mr-1.5" />
              View Details
            </Button>
            
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleExport}
              disabled={isExporting || !project.responseCount}
              className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
            </Button>

            <DeleteProjectButton id={project.id} />
          </div>
        </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>`&quot;`{project.title}`&quot;`</strong> and all{" "}
              <strong>{project.responseCount || 0}</strong> {project.responseCount === 1 ? "response" : "responses"}. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete Project"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}