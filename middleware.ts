import { updateSession } from "@/lib/supabase/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const ADMIN_HOST = "admin.candorsurvey.com"

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const host = request.headers.get("host") || ""

  // ----------------------------------------------------
  // 1) ADMIN SUBDOMAIN LOGIC
  // ----------------------------------------------------
  // When user opens https://admin.candorsurvey.com/
  // internally serve /dashboard (URL stays as admin.candorsurvey.com/)
  if (host === ADMIN_HOST && url.pathname === "/") {
    url.pathname = "/dashboard"
    return NextResponse.rewrite(url)
  }

  // ----------------------------------------------------
  // 2) Supabase session middleware (AUTH must always run)
  //    This handles:
  //    - Session refresh
  //    - Cookie management
  //    - Auth protection for /dashboard, /projects, /respondents
  // ----------------------------------------------------
  return await updateSession(request)
}

// --------------------------------------------------------
// 3) MATCHER — Run middleware on all routes except static assets
// --------------------------------------------------------
export const config = {
  matcher: [
    /**
     * Run middleware on everything EXCEPT:
     * - _next/static
     * - _next/image
     * - favicon + public assets (images)
     * - /auth/*
     * - /survey
     * - /thank-you
     * - /api/survey   (if you want survey hit to be as cheap as possible)
     */
    "/((?!_next/static|_next/image|favicon.ico|auth|survey|thank-you|api/survey|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}