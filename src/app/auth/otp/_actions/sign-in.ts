'use server'

import { cookies } from 'next/headers'

import { AUTHORIZATION_TOKEN } from '@/app/_constants'

export async function setTokenAction(authorizationToken: string) {
  const cookieStore = await cookies()
  cookieStore.set(AUTHORIZATION_TOKEN, authorizationToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })
}
