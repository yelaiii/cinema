import type { Locale } from '@kanjou/react'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { I18nProvider } from '@kanjou/react'
import { Nunito } from 'next/font/google'
import { cookies } from 'next/headers'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import '@/assets/styles/globals.css'
import { getUsersSession } from '@/api'
import { UserProvider } from '@/app/_contexts/user'
import { cn } from '@/utils/cn'

const locales = {
  en: () => import('@/assets/locales/en'),
  ru: () => import('@/assets/locales/ru'),
  uk: () => import('@/assets/locales/uk'),
} as const

const nunitoSans = Nunito({
  variable: '--font-nunito-sans',
  subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
  title: 'Cinema',
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const cookieStore = await cookies()

  const user = (await getUsersSession().catch(() => null))?.data.user || {}

  const locale = (cookieStore.get('locale')?.value as Locale) || 'en'
  const messages = await locales[locale]()

  return (
    <html
      lang={locale}
      className={cn(
        'bg-background text-foreground font-nunito h-full antialiased overflow-x-hidden',
        nunitoSans.variable,
      )}
    >
      <body className="relative h-full p-[16px]! md:px-[120px] md:py-[64px] xl:max-w-[1440px] mx-auto my-0">
        <I18nProvider locale={locale} messages={messages.default}>
          <NuqsAdapter>
            <UserProvider defaultUser={user}>{children}</UserProvider>
          </NuqsAdapter>
        </I18nProvider>
      </body>
    </html>
  )
}
