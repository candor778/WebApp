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
import { MessageSquare, Plus, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

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
  const [newRemark, setNewRemark] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
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

  const handleDeleteRemark = async (remarkId: string) => {
    try {
      const { error } = await supabase.from("remarks").delete().eq("id", remarkId)

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
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MessageSquare className="mr-2 h-4 w-4" />
          Remarks {remarks.length > 0 && `(${remarks.length})`}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Project Remarks</DialogTitle>
          <DialogDescription>
            Add notes and remarks for this project
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {/* Add New Remark */}
          <div className="space-y-2">
            <Textarea
              placeholder="Add a new remark..."
              value={newRemark}
              onChange={(e) => setNewRemark(e.target.value)}
              rows={3}
            />
            <Button
              onClick={handleAddRemark}
              disabled={!newRemark.trim() || submitting}
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Remark
            </Button>
          </div>

          {/* Remarks List */}
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading remarks...
            </div>
          ) : remarks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No remarks yet. Add your first remark above.
            </div>
          ) : (
            <div className="space-y-3">
              {remarks.map((remark) => (
                <Card key={remark.id}>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm whitespace-pre-wrap">{remark.content}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {remark.created_by && (
                            <>
                              <span>{remark.created_by}</span>
                              <span>•</span>
                            </>
                          )}
                          <span>{formatDate(remark.created_at)}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRemark(remark.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}