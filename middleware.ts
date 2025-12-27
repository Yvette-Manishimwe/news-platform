import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" ||
    path === "/login" ||
    path === "/register" ||
    path === "/dashboard" ||
    path==="/dashboard/new-article"||
    path.startsWith("/article/") ||
    path.startsWith("/category/") ||
    path.startsWith("/api/auth/")

  // Get the token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET,
  })

  // Redirect logic
  if (isPublicPath && token) {
    // If user is logged in and tries to access login/register page, redirect to dashboard
    if (path === "/login" || path === "/register") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  if (!isPublicPath && !token) {
    // If user is not logged in and tries to access protected route, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*", "/article/:path*", "/category/:path*", "/api/:path*"],
}

