"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Loader2 } from "lucide-react"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

interface DeleteRespondentButtonProps {
  id: string
  onDeleteSuccess?: () => void
}

export function DeleteRespondentButton({ id, onDeleteSuccess }: DeleteRespondentButtonProps) {
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)
  const [password, setPassword] = useState("")
  const [open, setOpen] = useState(false)
  const [error, setError] = useState("")

  const handleDelete = async () => {
    if (!password.trim()) {
      setError("Please enter the super password")
      return
    }

    setIsDeleting(true)
    setError("")

    try {
      const res = await fetch(`/api/respondents/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (res.status === 403) {
        setError("Incorrect super password. Please try again.")
        setIsDeleting(false)
        return
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete")
      }

      toast({
        title: "Respondent deleted",
        description: "The respondent and their response have been successfully deleted.",
      })
      setOpen(false)
      setPassword("")
      setError("")
      
      // Call the callback to refresh the list
      onDeleteSuccess?.()
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete respondent. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      setPassword("")
      setError("")
    }
  }

  // Stop propagation to prevent row/card click from navigating
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div onClick={handleClick}>
      <AlertDialog open={open} onOpenChange={handleOpenChange}>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-700" title="Delete respondent" disabled={isDeleting}>
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent onClick={handleClick}>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete respondent?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this respondent&apos;s response and
              all associated metadata.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4">
            <Label htmlFor="super-password" className="text-sm font-medium">
              Enter Super Password
            </Label>
            <Input
              id="super-password"
              type="password"
              placeholder="Super password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (error) setError("")
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isDeleting) {
                  handleDelete()
                }
              }}
              className="mt-2"
              disabled={isDeleting}
            />
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <Button onClick={handleDelete} disabled={isDeleting} variant="destructive">
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}