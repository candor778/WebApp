import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProjectDetailLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-6 w-px" />
        <Skeleton className="h-8 w-20" />
        <div className="flex-1" />
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </header>

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-96 mt-2" />
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
