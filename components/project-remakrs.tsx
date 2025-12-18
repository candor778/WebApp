// components/project-remarks.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Plus, Trash2, Search, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
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

interface Remark {
  id: string
  content: string
  created_by: string | null
  created_at: string
}

interface ProjectRemarksProps {
  projectId: string
}

export function ProjectRemarks({ projectId }: ProjectRemarksProps) {
  const [open, setOpen] = useState(false)
  const [remarks, setRemarks] = useState<Remark[]>([])
  const [filteredRemarks, setFilteredRemarks] = useState<Remark[]>([])
  const [newRemark, setNewRemark] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { toast } = useToast()
  const supabase = createClient()

  const fetchRemarks = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("remarks")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false })

      if (error) throw error
      setRemarks(data || [])
      setFilteredRemarks(data || [])
    } catch (error) {
      console.error("Error fetching remarks:", error)
      toast({
        title: "Error",
        description: "Failed to load remarks",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      fetchRemarks()
    }
  }, [open])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRemarks(remarks)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = remarks.filter(
        (remark) =>
          remark.content.toLowerCase().includes(query) ||
          remark.created_by?.toLowerCase().includes(query)
      )
      setFilteredRemarks(filtered)
    }
  }, [searchQuery, remarks])

  const handleAddRemark = async () => {
    if (!newRemark.trim()) return

    setSubmitting(true)
    try {
      const { data: userData } = await supabase.auth.getUser()
      
      const { error } = await supabase.from("remarks").insert({
        project_id: projectId,
        content: newRemark.trim(),
        created_by: userData.user?.email || null,
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "Remark added successfully",
      })

      setNewRemark("")
      fetchRemarks()
    } catch (error) {
      console.error("Error adding remark:", error)
      toast({
        title: "Error",
        description: "Failed to add remark",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteRemark = async () => {
    if (!deleteId) return

    try {
      const { error } = await supabase.from("remarks").delete().eq("id", deleteId)

      if (error) throw error

      toast({
        title: "Success",
        description: "Remark deleted successfully",
      })

      fetchRemarks()
    } catch (error) {
      console.error("Error deleting remark:", error)
      toast({
        title: "Error",
        description: "Failed to delete remark",
        variant: "destructive",
      })
    } finally {
      setDeleteId(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date)
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Remarks
            {remarks.length > 0 && (
              <span className="ml-1.5 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                {remarks.length}
              </span>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl h-[85vh] p-0 flex flex-col">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-xl">Project Remarks</DialogTitle>
            <DialogDescription>
              Add notes and remarks for this project. Use search to find specific remarks.
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 pb-4 space-y-4">
            {/* Add New Remark */}
            <div className="space-y-2">
              <Textarea
                placeholder="Add a new remark..."
                value={newRemark}
                onChange={(e) => setNewRemark(e.target.value)}
                rows={3}
                className="resize-none"
              />
              <Button
                onClick={handleAddRemark}
                disabled={!newRemark.trim() || submitting}
                size="sm"
                className="w-full sm:w-auto"
              >
                <Plus className="mr-2 h-4 w-4" />
                {submitting ? "Adding..." : "Add Remark"}
              </Button>
            </div>

            {/* Search Bar */}
            {remarks.length > 0 && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search remarks..."
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
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Remarks List */}
          <div className="flex-1 overflow-hidden border-t">
            <ScrollArea className="h-full">
              <div className="px-6 py-4">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center space-y-2">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
                      <p className="text-sm text-muted-foreground">Loading remarks...</p>
                    </div>
                  </div>
                ) : filteredRemarks.length === 0 ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center space-y-2">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto opacity-50" />
                      <p className="text-sm font-medium">
                        {searchQuery ? "No remarks found" : "No remarks yet"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {searchQuery
                          ? `No results for "${searchQuery}"`
                          : "Add your first remark above"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {searchQuery && (
                      <div className="text-sm text-muted-foreground pb-2">
                        Found {filteredRemarks.length} of {remarks.length} remarks
                      </div>
                    )}
                    {filteredRemarks.map((remark, index) => (
                      <Card key={remark.id} className="group hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0 flex flex-col items-center gap-1 pt-1">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-xs font-medium text-primary">
                                  {remarks.length - remarks.findIndex(r => r.id === remark.id)}
                                </span>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0 space-y-2">
                              <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                                {remark.content}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                {remark.created_by && (
                                  <>
                                    <span className="font-medium">{remark.created_by}</span>
                                    <span>•</span>
                                  </>
                                )}
                                <span title={new Date(remark.created_at).toLocaleString()}>
                                  {formatDate(remark.created_at)}
                                </span>
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setDeleteId(remark.id)}
                                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete remark</span>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          <div className="px-6 py-4 border-t bg-muted/30">
            <p className="text-xs text-muted-foreground text-center">
              Total: {remarks.length} {remarks.length === 1 ? "remark" : "remarks"}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Remark</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this remark? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRemark}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}