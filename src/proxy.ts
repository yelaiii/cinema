import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

import { getUsersSession } from '@/api'

export async function proxy(request: NextRequest) {
  const user = await getUsersSession().catch(() => null)

  if (user) return NextResponse.next()

  const redirectUrl = new URL('/auth', request.url)
  redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)

  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: ['/profile', '/tickets'],
}
