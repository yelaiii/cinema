'use server'

import { cookies } from 'next/headers'

import { AUTHORIZATION_TOKEN } from '@/app/_constants'

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete(AUTHORIZATION_TOKEN)
}
