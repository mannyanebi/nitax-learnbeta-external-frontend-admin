import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  let isLoggedIn = false
  const authPages = ['/auth/signin', '/auth/forgot_password']
  const admin = request.cookies.get('learnbeta_admin')

  if (admin) {
    isLoggedIn = true
  }

  if (request.nextUrl.pathname === '/' && isLoggedIn) {
    return NextResponse.redirect(new URL(`/dashboard/overview`, request.url))
  }

  if (request.nextUrl.pathname === '/' && !isLoggedIn) {
    return NextResponse.redirect(new URL(`/auth/signin`, request.url))
  }

  if (request.nextUrl.pathname.startsWith('/dashboard' || '/profile') && !isLoggedIn) {
    return NextResponse.redirect(new URL(`/auth/signin?redirect=${request.nextUrl.pathname}`, request.url))
  }

  if (authPages.includes(request.nextUrl.pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard/overview', request.url))
  }

  return NextResponse.next()
} 