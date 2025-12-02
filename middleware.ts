import { updateSession } from "@/lib/supabase/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const ADMIN_HOST = "admin.candorsurvey.com"

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const host = request.headers.get("host") || ""

  // ----------------------------------------------------
  // 1) BLOCK /dashboard access from non-admin domains
  // ----------------------------------------------------
  if (url.pathname.startsWith("/dashboard") && host !== ADMIN_HOST) {
    // Redirect to home or show 404
    url.pathname = "/"
    return NextResponse.redirect(url)
    // OR return 404:
    // return new NextResponse("Not Found", { status: 404 })
  }

  // ----------------------------------------------------
  // 2) ADMIN SUBDOMAIN LOGIC
  // ----------------------------------------------------
  // When user opens https://admin.candorsurvey.com/
  // internally serve /dashboard (URL stays as admin.candorsurvey.com/)
  if (host === ADMIN_HOST && url.pathname === "/") {
    url.pathname = "/dashboard"
    return NextResponse.rewrite(url)
  }

  // ----------------------------------------------------
  // 3) Supabase session middleware (AUTH must always run)
  // ----------------------------------------------------
  return await updateSession(request)
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|auth|survey|thank-you|api/survey|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}