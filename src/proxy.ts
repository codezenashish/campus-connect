import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

/**
 * Next.js 16 Proxy / Request Interceptor.
 * Next.js 16 uses `proxy.ts` and deprecated `export async function middleware` in favor of `export async function proxy`.
 */
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

// Backward-compatibility alias for Next.js 15 runtimes
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - common static file extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|woff|woff2)$).*)",
  ],
};
