import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedPaths = ['/cart', '/checkout', '/user']
const unauthenticatedPaths = ['/login', '/register', 'resend-email', '/forgot-password']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const accessToken = request.cookies.get('accessToken')?.value

  // Redirect to login page if doesn't have access token
  if (protectedPaths.some((item) => pathname.startsWith(item)) && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to home page if has access token
  if (unauthenticatedPaths.some((item) => pathname.startsWith(item)) && accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login', '/register', '/user'],
}
