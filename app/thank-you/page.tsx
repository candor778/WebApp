"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function ThankYouContent() {
  const searchParams = useSearchParams()

  const projectId = searchParams.get("projectId")
  const userId = searchParams.get("userId")
  const status = searchParams.get("status")
  const ipAddress = searchParams.get("ipAddress")
  const responseId = searchParams.get("responseId")
  const isDuplicate = searchParams.get("duplicate") === "true"

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/40 to-background flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-xl p-8 max-w-2xl w-full border">
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 ${isDuplicate ? "bg-yellow-100 dark:bg-yellow-900/30" : "bg-green-100 dark:bg-green-900/30"} rounded-full mb-4`}
          >
            {isDuplicate ? (
              <svg
                className="w-8 h-8 text-yellow-600 dark:text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isDuplicate ? "Already Submitted" : "Thank You!"}
          </h1>
          <p className="text-muted-foreground">
            {isDuplicate
              ? "You have already submitted a response for this project."
              : "Your response has been recorded successfully."}
          </p>
        </div>

        <div className="space-y-4 bg-muted/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Response Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-1">Project ID</p>
              <p className="text-lg font-mono font-semibold text-foreground break-all">{projectId || "N/A"}</p>
            </div>

            <div className="bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-1">User ID</p>
              <p className="text-lg font-mono font-semibold text-foreground break-all">{userId || "N/A"}</p>
            </div>

            <div className="bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <p className="text-lg font-semibold text-foreground capitalize">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    status?.toLowerCase() === "completed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : status?.toLowerCase() === "started"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {status || "N/A"}
                </span>
              </p>
            </div>

            <div className="bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-1">IP Address</p>
              <p className="text-lg font-mono font-semibold text-foreground">{ipAddress || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">You can close this page now.</p>
        </div>
      </div>
    </div>
  )
}

function ThankYouSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/40 to-background flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-xl p-8 max-w-2xl w-full border animate-pulse">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4" />
          <div className="h-8 w-48 bg-muted rounded mx-auto mb-2" />
          <div className="h-4 w-64 bg-muted rounded mx-auto" />
        </div>
        <div className="space-y-4 bg-muted/50 rounded-lg p-6">
          <div className="h-6 w-40 bg-muted rounded mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card p-4 rounded-lg border">
                <div className="h-4 w-20 bg-muted rounded mb-2" />
                <div className="h-6 w-32 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<ThankYouSkeleton />}>
      <ThankYouContent />
    </Suspense>
  )
}
