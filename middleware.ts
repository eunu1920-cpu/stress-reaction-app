import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Legacy redirect: /result/S4 → /result/stress/S4
 * Resolves conflict between [type] and [testType]/[resultType] dynamic routes.
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const match = pathname.match(/^\/result\/([^/]+)$/)
  if (match) {
    const type = match[1]
    return NextResponse.redirect(new URL(`/result/stress/${type}`, request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/result/:path*',
}
