"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Image from "next/image"
import Logo from "@/public/assets/candor-logo-transparent.png"

function ProjectDisabledContent() {
  const searchParams = useSearchParams()

  const projectId = searchParams.get("projectId")
  const projectName = searchParams.get("projectName")

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/40 to-background flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-xl p-8 max-w-2xl w-full border">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image 
            src={Logo} 
            alt="Candor Logo" 
            width={150} 
            height={60}
            className="object-contain"
            priority
          />
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-orange-600 dark:text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Project Currently Disabled
          </h1>
          <p className="text-muted-foreground text-lg">
            This project is not accepting responses at the moment.
          </p>
        </div>

        <div className="space-y-4 bg-muted/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Project Information</h2>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-1">Project ID</p>
              <p className="text-lg font-mono font-semibold text-foreground break-all">
                {projectId || "N/A"}
              </p>
            </div>

            {projectName && (
              <div className="bg-card p-4 rounded-lg border">
                <p className="text-sm text-muted-foreground mb-1">Project Name</p>
                <p className="text-lg font-semibold text-foreground break-all">
                  {projectName}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Note:</strong> The project administrator has temporarily disabled this project. 
              Please contact support if you believe this is an error or check back later.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">You can close this page now.</p>
        </div>
      </div>
    </div>
  )
}

function ProjectDisabledSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/40 to-background flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-xl p-8 max-w-2xl w-full border animate-pulse">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-40 bg-muted rounded" />
        </div>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4" />
          <div className="h-8 w-64 bg-muted rounded mx-auto mb-2" />
          <div className="h-4 w-80 bg-muted rounded mx-auto" />
        </div>
        <div className="space-y-4 bg-muted/50 rounded-lg p-6">
          <div className="h-6 w-40 bg-muted rounded mb-4" />
          <div className="bg-card p-4 rounded-lg border">
            <div className="h-4 w-20 bg-muted rounded mb-2" />
            <div className="h-6 w-32 bg-muted rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectDisabledPage() {
  return (
    <Suspense fallback={<ProjectDisabledSkeleton />}>
      <ProjectDisabledContent />
    </Suspense>
  )
}