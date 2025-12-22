"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download, Calendar, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { ToggleProjectButton } from "./toggle-project-button"
import { DeleteProjectButton } from "./delete-project-button"
import { ExportButton } from "./respondent-export-button"

interface ProjectRowProps {
  project: {
    id: string
    project_id: string
    title: string
    description: string | null
    is_active: boolean
    created_at: string
    responseCount?: number
  }
  serial: string
}

export function ProjectCard({ project, serial }: ProjectRowProps) {
  const router = useRouter()


  return (
    <div
      onClick={() => router.push(`/projects/${project.id}`)}
      className="group relative flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4 
                 rounded-2xl border border-gray-200 bg-white p-4 lg:px-6 lg:py-4
                 hover:border-[#22d3ee]/40 hover:shadow-lg hover:shadow-[#22d3ee]/10
                 transition-all duration-300 cursor-pointer
                 active:scale-[0.98]"
    >
      {/* Top Row: Serial, Status, Actions (Mobile) */}
      <div className="flex items-center justify-between lg:contents">
        {/* Serial Number */}
        <div className="shrink-0">
          <span
            className="inline-flex items-center justify-center rounded-lg 
                         bg-gradient-to-br from-[#1b3750] to-[#1b3750]/80 
                         px-3 py-1.5 lg:px-3 lg:py-2 
                         text-xs lg:text-sm font-mono font-bold text-white 
                         shadow-sm group-hover:shadow-md transition-shadow"
          >
            #{serial}
          </span>
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <Badge
            variant={project.is_active ? "default" : "secondary"}
            className={`text-xs ${project.is_active ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm" : "bg-gray-200 text-gray-700"}`}
          >
            {project.is_active ? "Active" : "Inactive"}
          </Badge>

          <ToggleProjectButton id={project.id} isActive={project.is_active} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 space-y-2 lg:space-y-1">
        {/* Project ID & Status (Desktop only for status) */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="font-mono text-xs lg:text-sm text-[#1b3750] bg-[#22d3ee]/10 
                         px-2.5 py-1 rounded-md font-semibold border border-[#22d3ee]/20
                         group-hover:bg-[#22d3ee]/20 transition-colors"
          >
            {project.project_id}
          </span>

          {/* Desktop Status Badge */}
          <Badge
            variant={project.is_active ? "default" : "secondary"}
            className={`hidden lg:inline-flex text-xs ${
              project.is_active
                ? "bg-[#1b3750]/90 hover:bg-[#1b3750] text-white shadow-sm"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {project.is_active ? "Active" : "Inactive"}
          </Badge>

          {/* Mobile Date */}
          <div className="flex lg:hidden items-center gap-1.5 text-xs text-gray-500 ml-auto">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              {new Date(project.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Project Title */}
        <h3
          className="text-sm lg:text-base font-semibold text-[#1b3750] 
                     line-clamp-1 lg:line-clamp-none
                     group-hover:text-[#1b3750] transition-colors"
        >
          {project.title}
        </h3>
      </div>

      {/* Stats & Actions Row */}
      <div className="flex items-center justify-between lg:contents gap-3">
        {/* Created Date (Desktop) */}
        <div
          className="hidden lg:flex items-center gap-2 text-sm min-w-[140px] 
                      px-3 py-2 rounded-lg bg-gray-50 border border-gray-100"
        >
          <Calendar className="h-4 w-4 text-[#1b3750]/60" />
          <span className="text-[#1b3750]/80 font-medium">
            {new Date(project.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Response Count */}
        <div
          className="flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2.5 
                      rounded-xl bg-gradient-to-br from-[#22d3ee]/10 to-[#22d3ee]/5 
                      border border-[#22d3ee]/20
                      group-hover:from-[#22d3ee]/20 group-hover:to-[#22d3ee]/10
                      group-hover:border-[#22d3ee]/30
                      transition-all duration-300 min-w-[130px] lg:min-w-[140px]"
        >
          <Users className="h-4 w-4 lg:h-5 lg:w-5 text-[#22d3ee] flex-shrink-0" />
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-lg lg:text-xl text-[#1b3750]">{project.responseCount ?? 0}</span>
            <span className="text-xs lg:text-sm text-[#1b3750]/60 font-medium">
              {project.responseCount === 1 ? "response" : "responses"}
            </span>
          </div>
        </div>

        {/* Desktop Toggle */}
        <div className="hidden lg:block" onClick={(e) => e.stopPropagation()}>
          <ToggleProjectButton id={project.id} isActive={project.is_active} />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <Button
            size="icon"
            variant="outline"
            className="h-9 w-9 lg:h-10 lg:w-10 rounded-lg border-gray-200
                     hover:bg-[#1b3750] hover:text-white hover:border-[#1b3750]
                     hover:shadow-md hover:scale-105
                     transition-all duration-200 bg-transparent"
          >
            <Eye className="h-4 w-4" />
          </Button>

          <ExportButton />

          <DeleteProjectButton id={project.id} />
        </div>
      </div>
    </div>
  )
}
