import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, Zap, Lock, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background to-muted/40">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Response Tracker</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/auth/login">
              <Button size="sm" className="shadow-sm">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container flex flex-col items-center gap-8 px-4 py-20 md:py-28">
          <div className="flex max-w-3xl flex-col items-center gap-5 text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Capture Survey <span className="text-primary">Completions</span>
            </h1>
            <p className="max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
              A lightweight solution to capture and track survey completions when external survey tools redirect users
              to your endpoint. Fast, reliable, and metadata-only.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/auth/login">
                <Button size="lg" className="px-6 shadow-sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/40 py-16">
          <div className="container px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-3 rounded-xl border bg-background/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <Zap className="h-10 w-10 text-primary" />
                <h3 className="text-lg font-semibold">Fast Capture</h3>
                <p className="text-sm text-muted-foreground">Instantly capture survey completions via redirect URL</p>
              </div>
              <div className="flex flex-col gap-3 rounded-xl border bg-background/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <Lock className="h-10 w-10 text-primary" />
                <h3 className="text-lg font-semibold">Metadata Only</h3>
                <p className="text-sm text-muted-foreground">Store only essential data: user ID, status, device info</p>
              </div>
              <div className="flex flex-col gap-3 rounded-xl border bg-background/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <BarChart3 className="h-10 w-10 text-primary" />
                <h3 className="text-lg font-semibold">Track Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor completions, terminations, and starts in real-time
                </p>
              </div>
              <div className="flex flex-col gap-3 rounded-xl border bg-background/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <FileText className="h-10 w-10 text-primary" />
                <h3 className="text-lg font-semibold">Auto Projects</h3>
                <p className="text-sm text-muted-foreground">Projects auto-create when new survey IDs are received</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background/80">
        <div className="container flex h-16 items-center justify-between px-4">
          <p className="text-sm text-muted-foreground">Built with Next.js and Supabase</p>
        </div>
      </footer>
    </div>
  )
}
