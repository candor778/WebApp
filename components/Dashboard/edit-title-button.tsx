"use client"

import { useState, useRef, useEffect } from "react"
import { Pencil, Check, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface EditTitleButtonProps {
  projectId: string
  currentTitle: string
}

export function EditTitleButton({ projectId, currentTitle }: EditTitleButtonProps) {
  // `displayedTitle` is the source of truth for what's shown — updated optimistically
  const [displayedTitle, setDisplayedTitle] = useState(currentTitle)
  const [draftTitle, setDraftTitle] = useState(currentTitle)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Keep in sync if the prop changes from outside (e.g. full page re-navigation)
  useEffect(() => {
    setDisplayedTitle(currentTitle)
  }, [currentTitle])

  useEffect(() => {
    if (isEditing) {
      setDraftTitle(displayedTitle)
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  const handleSave = async () => {
    const trimmed = draftTitle.trim()
    if (!trimmed) return
    if (trimmed === displayedTitle) {
      setIsEditing(false)
      return
    }

    // Optimistically update the displayed title immediately
    setDisplayedTitle(trimmed)
    setIsEditing(false)
    setIsLoading(true)

    try {
      const res = await fetch(`/api/projects/${projectId}/title`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmed }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to update title")
      }

      toast.success("Title updated")
      // Refresh in background to sync server state — no visible flicker since
      // displayedTitle is already showing the correct value
      router.refresh()
    } catch (err: any) {
      // Revert on failure
      toast.error(err.message || "Something went wrong")
      setDisplayedTitle(currentTitle)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setDraftTitle(displayedTitle)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSave()
    if (e.key === "Escape") handleCancel()
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 flex-1">
        <Input
          ref={inputRef}
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="text-2xl font-bold h-auto py-1 px-2 max-w-xl"
        />
        <Button
          size="icon"
          variant="ghost"
          onClick={handleSave}
          disabled={isLoading || !draftTitle.trim()}
          className="text-green-600 hover:text-green-700 hover:bg-green-50"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleCancel}
          disabled={isLoading}
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {/* Render `displayedTitle` (local state), NOT the prop directly */}
      <h1 className="text-2xl font-bold">{displayedTitle}</h1>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIsEditing(true)}
        disabled={isLoading}
        className="text-muted-foreground hover:text-foreground h-8 w-8"
        title="Edit title"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Pencil className="h-4 w-4" />}
      </Button>
    </div>
  )
}