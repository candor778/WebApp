import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function RespondentsLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-6 w-px" />
        <Skeleton className="h-6 w-28" />
      </header>

      <main className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-10 w-32" />
            </div>
            <Skeleton className="h-96 w-full" />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
