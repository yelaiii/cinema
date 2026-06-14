import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Nunito } from 'next/font/google'

import '@/assets/styles/globals.css'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { getUsersSession } from '@/api'
import { UserProvider } from '@/app/_contexts/user-context'
import { cn } from '@/utils/cn'

const nunitoSans = Nunito({
  variable: '--font-nunito-sans',
  subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
  title: 'Cinema',
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const user = (await getUsersSession().catch(() => null))?.data.user

  return (
    <html
      lang="en"
      className={cn(
        'bg-background text-foreground font-nunito h-full antialiased overflow-x-hidden',
        nunitoSans.variable,
      )}
    >
      <body className="relative h-full p-[16px]! md:px-[120px] md:py-[64px] xl:max-w-[1440px] mx-auto my-0">
        <NuqsAdapter>
          <UserProvider user={user}>{children}</UserProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}
