// components/project-remarks.tsx
"use client"
import { useState, useEffect, useRef } from "react"
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
import {
  MessageSquare,
  Plus,
  Trash2,
  Search,
  X,
  Pencil,
  Check,
  ArrowLeft,
  ChevronRight,
} from "lucide-react"
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
  updated_at: string
}

interface ProjectRemarksProps {
  projectId: string
}

type View = "list" | "detail"

export function ProjectRemarks({ projectId }: ProjectRemarksProps) {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<View>("list")
  const [selectedRemark, setSelectedRemark] = useState<Remark | null>(null)

  const [remarks, setRemarks] = useState<Remark[]>([])
  const [filteredRemarks, setFilteredRemarks] = useState<Remark[]>([])
  const [newRemark, setNewRemark] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Edit state (used in detail view)
  const [isEditing, setIsEditing] = useState(false)
  const [editingContent, setEditingContent] = useState("")
  const [savingEdit, setSavingEdit] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const editTextareaRef = useRef<HTMLTextAreaElement>(null)
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
      // Keep selectedRemark in sync if we're in detail view
      if (selectedRemark) {
        const updated = (data || []).find((r) => r.id === selectedRemark.id)
        if (updated) setSelectedRemark(updated)
      }
    } catch (error) {
      console.error("Error fetching remarks:", error)
      toast({ title: "Error", description: "Failed to load remarks", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) fetchRemarks()
  }, [open])

  // Reset to list when dialog closes
  useEffect(() => {
    if (!open) {
      setView("list")
      setSelectedRemark(null)
      setIsEditing(false)
      setEditingContent("")
    }
  }, [open])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRemarks(remarks)
    } else {
      const query = searchQuery.toLowerCase()
      setFilteredRemarks(
        remarks.filter(
          (r) =>
            r.content.toLowerCase().includes(query) ||
            r.created_by?.toLowerCase().includes(query)
        )
      )
    }
  }, [searchQuery, remarks])

  // Focus edit textarea when entering edit mode
  useEffect(() => {
    if (isEditing && editTextareaRef.current) {
      editTextareaRef.current.focus()
      const len = editTextareaRef.current.value.length
      editTextareaRef.current.setSelectionRange(len, len)
    }
  }, [isEditing])

  // ── Navigation ──────────────────────────────────────────────────────────────
  const openDetail = (remark: Remark) => {
    setSelectedRemark(remark)
    setIsEditing(false)
    setEditingContent("")
    setView("detail")
  }

  const goBack = () => {
    setIsEditing(false)
    setEditingContent("")
    setSelectedRemark(null)
    setView("list")
  }

  // ── Add ─────────────────────────────────────────────────────────────────────
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
      toast({ title: "Success", description: "Remark added successfully" })
      setNewRemark("")
      if (textareaRef.current) textareaRef.current.scrollTop = 0
      fetchRemarks()
    } catch (error) {
      console.error("Error adding remark:", error)
      toast({ title: "Error", description: "Failed to add remark", variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

  // ── Delete ───────────────────────────────────────────────────────────────────
  const handleDeleteRemark = async () => {
    if (!deleteId) return
    const isDeletingSelected = selectedRemark?.id === deleteId
    try {
      const { error } = await supabase.from("remarks").delete().eq("id", deleteId)
      if (error) throw error
      toast({ title: "Success", description: "Remark deleted successfully" })
      if (isDeletingSelected) goBack()
      fetchRemarks()
    } catch (error) {
      console.error("Error deleting remark:", error)
      toast({ title: "Error", description: "Failed to delete remark", variant: "destructive" })
    } finally {
      setDeleteId(null)
    }
  }

  // ── Edit ─────────────────────────────────────────────────────────────────────
  const handleStartEdit = () => {
    if (!selectedRemark) return
    setEditingContent(selectedRemark.content)
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingContent("")
  }

  const handleSaveEdit = async () => {
    if (!selectedRemark) return
    const trimmed = editingContent.trim()
    if (!trimmed) return
    setSavingEdit(true)
    try {
      const { error } = await supabase
        .from("remarks")
        .update({ content: trimmed, updated_at: new Date().toISOString() })
        .eq("id", selectedRemark.id)
      if (error) throw error
      toast({ title: "Success", description: "Remark updated successfully" })
      setIsEditing(false)
      setEditingContent("")
      fetchRemarks()
    } catch (error) {
      console.error("Error updating remark:", error)
      toast({ title: "Error", description: "Failed to update remark", variant: "destructive" })
    } finally {
      setSavingEdit(false)
    }
  }

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault()
      if (!savingEdit && editingContent.trim()) handleSaveEdit()
    }
    if (e.key === "Escape") {
      e.preventDefault()
      handleCancelEdit()
    }
  }

  const handleNewRemarkKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault()
      if (!submitting && newRemark.trim()) handleAddRemark()
    }
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────
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
    return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(date)
  }

  const wasEdited = (remark: Remark) =>
    new Date(remark.updated_at).getTime() - new Date(remark.created_at).getTime() > 2000

  const remarkIndex = (remark: Remark) =>
    remarks.length - remarks.findIndex((r) => r.id === remark.id)

  // ─────────────────────────────────────────────────────────────────────────────
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

        <DialogContent className="max-w-3xl h-[85vh] p-0 flex flex-col overflow-hidden">

          {/* ════════════════════════════════════════════════════════════════
              LIST VIEW
          ════════════════════════════════════════════════════════════════ */}
          {view === "list" && (
            <>
              <DialogHeader className="px-6 pt-3 pb-0 flex-shrink-0">
                <DialogTitle className="text-xl">Project Remarks</DialogTitle>
                <DialogDescription>
                  Add notes and remarks for this project. Click any remark to read in full.
                </DialogDescription>
              </DialogHeader>

              {/* New remark + search */}
              <div className="px-6 pb-4 space-y-3 flex-shrink-0">
                <div className="space-y-1.5">
                  <Textarea
                    ref={textareaRef}
                    placeholder="Add a new remark… (Ctrl+Enter to submit)"
                    value={newRemark}
                    onChange={(e) => setNewRemark(e.target.value)}
                    onKeyDown={handleNewRemarkKeyDown}
                    className="resize-none h-[96px] overflow-y-auto leading-relaxed text-sm transition-colors"
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">Ctrl+Enter to submit</p>
                    <Button
                      onClick={handleAddRemark}
                      disabled={!newRemark.trim() || submitting}
                      size="sm"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      {submitting ? "Adding…" : "Add Remark"}
                    </Button>
                  </div>
                </div>

                {remarks.length > 0 && (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <Input
                      type="text"
                      placeholder="Search remarks…"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-9"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
                        onClick={() => setSearchQuery("")}
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Remarks list */}
              <div className="flex-1 min-h-0 border-t">
                <ScrollArea className="h-full">
                  <div className="px-6 py-4">
                    {loading ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="text-center space-y-2">
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
                          <p className="text-sm text-muted-foreground">Loading remarks…</p>
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
                          <p className="text-sm text-muted-foreground pb-2">
                            Found {filteredRemarks.length} of {remarks.length} remarks
                          </p>
                        )}
                        {filteredRemarks.map((remark) => (
                          <Card
                            key={remark.id}
                            onClick={() => openDetail(remark)}
                            className="group hover:shadow-md transition-shadow cursor-pointer"
                          >
                            <CardContent className="px-2 py-3">
                              <div className="flex gap-4 items-start">
                                {/* Index badge */}
                                <div className="flex-shrink-0 pt-0.5">
                                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-xs font-medium text-primary">
                                      {remarkIndex(remark)}
                                    </span>
                                  </div>
                                </div>

                                {/* Fixed-height preview with fade */}
                                <div className="flex-1 min-w-0 space-y-2">
                                  <div className="h-[3rem] overflow-hidden relative">
                                    <p className="text-sm leading-6 whitespace-pre-wrap break-words">
                                      {remark.content}
                                    </p>
                                    {/* Fade at bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                                  </div>

                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    {remark.created_by && (
                                      <>
                                        <span className="font-medium truncate max-w-[200px]">
                                          {remark.created_by}
                                        </span>
                                        <span aria-hidden>•</span>
                                      </>
                                    )}
                                    <span title={new Date(remark.created_at).toLocaleString()}>
                                      {formatDate(remark.created_at)}
                                    </span>
                                    {wasEdited(remark) && (
                                      <>
                                        <span aria-hidden>•</span>
                                        <span
                                          className="italic"
                                          title={`Edited ${new Date(remark.updated_at).toLocaleString()}`}
                                        >
                                          edited
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>

                                {/* Chevron — hover hint */}
                                <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
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

              {/* Footer */}
              <div className="px-6 py-3 border-t bg-muted/30 flex-shrink-0">
                <p className="text-xs text-muted-foreground text-center">
                  {remarks.length === 0
                    ? "No remarks yet"
                    : `${remarks.length} ${remarks.length === 1 ? "remark" : "remarks"} total`}
                </p>
              </div>
            </>
          )}

          {/* ════════════════════════════════════════════════════════════════
              DETAIL VIEW
          ════════════════════════════════════════════════════════════════ */}
          {view === "detail" && selectedRemark && (
            <>
              {/* Header: back + meta + actions */}
              <div className="px-6 pt-5 flex-shrink-0 flex items-center gap-3 border-b">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goBack}
                  className="h-8 px-2 text-muted-foreground hover:text-foreground -ml-1 flex-shrink-0"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    Remark #{remarkIndex(selectedRemark)}
                  </p>
                  {selectedRemark.created_by && (
                    <p className="text-xs text-muted-foreground truncate">
                      {selectedRemark.created_by}
                    </p>
                  )}
                </div>

                {!isEditing && (
                  <div className="flex items-center pr-3 gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleStartEdit}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                      aria-label="Edit remark"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteId(selectedRemark.id)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      aria-label="Delete remark"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Full remark content */}
              <div className="flex-1 min-h-0">
                <ScrollArea className="h-full">
                  <div className="px-6 py-5">
                    {isEditing ? (
                      <div className="space-y-3">
                        <Textarea
                          ref={editTextareaRef}
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          onKeyDown={handleEditKeyDown}
                          disabled={savingEdit}
                          className="resize-none text-sm leading-relaxed min-h-[200px] w-full"
                          placeholder="Edit remark…"
                        />
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={handleSaveEdit}
                            disabled={!editingContent.trim() || savingEdit}
                          >
                            <Check className="mr-1.5 h-3.5 w-3.5" />
                            {savingEdit ? "Saving…" : "Save"}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCancelEdit}
                            disabled={savingEdit}
                          >
                            Cancel
                          </Button>
                          <p className="text-xs text-muted-foreground ml-auto">
                            Ctrl+Enter to save · Esc to cancel
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {selectedRemark.content}
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Detail footer — timestamps */}
              <div className="px-6 py-3 border-t bg-muted/30 flex-shrink-0 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Created{" "}
                  <span title={new Date(selectedRemark.created_at).toLocaleString()}>
                    {formatDate(selectedRemark.created_at)}
                  </span>
                </p>
                {wasEdited(selectedRemark) && (
                  <p className="text-xs text-muted-foreground italic">
                    Edited{" "}
                    <span title={new Date(selectedRemark.updated_at).toLocaleString()}>
                      {formatDate(selectedRemark.updated_at)}
                    </span>
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
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