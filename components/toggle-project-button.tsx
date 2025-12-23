// components/toggle-project-button.tsx
"use client"

import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/contexts/auth-context"

interface ToggleProjectButtonProps {
  id: string
  isActive: boolean
}

export function ToggleProjectButton({ id, isActive }: ToggleProjectButtonProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { isAdmin, isLoading } = useAuth()
  const [isToggling, setIsToggling] = useState(false)

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isToggling) return

    setIsToggling(true)

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !isActive }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to update project status")
      }

      toast({
        title: `Project ${!isActive ? "activated" : "deactivated"}`,
        description: `The project has been successfully ${
          !isActive ? "activated" : "deactivated"
        }.`,
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to update project status",
        variant: "destructive",
      })
    } finally {
      setIsToggling(false)
    }
  }

  // Don't render while loading or if not admin
  if (isLoading || !isAdmin) {
    return null
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isToggling}
      title={isActive ? "Deactivate project" : "Activate project"}
      className={`
        relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full
        transition-colors duration-300
        ${isActive ? "bg-green-500" : "bg-red-600"}
        ${isToggling ? "opacity-70 cursor-not-allowed" : ""}
      `}
      aria-pressed={isActive}
      aria-label={isActive ? "Deactivate project" : "Activate project"}
    >
      {/* Thumb */}
      <span
        className={`
          inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow
          transition-transform duration-300
          ${isActive ? "translate-x-6" : "translate-x-1"}
        `}
      >
        {isToggling && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
      </span>
    </button>
  )
}