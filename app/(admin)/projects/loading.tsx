import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProjectsLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-6 w-px" />
        <Skeleton className="h-6 w-20" />
        <div className="ml-auto">
          <Skeleton className="h-10 w-32" />
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-36" />
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-8 w-24" />
              </CardContent>
              <div className="p-6 pt-0">
                <Skeleton className="h-10 w-full" />
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
