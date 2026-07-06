import type { Locale } from '@kanjou/react'

import { createI18n } from '@kanjou/react/server'
import { cookies } from 'next/headers'

const locales = {
  en: () => import('@/assets/locales/en'),
  ru: () => import('@/assets/locales/ru'),
  uk: () => import('@/assets/locales/uk'),
} as const

export async function getI18n() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en'
  const messages = await locales[locale]()
  return createI18n({ messages: messages.default })
}
