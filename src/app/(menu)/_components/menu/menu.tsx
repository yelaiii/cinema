'use client'

import { useI18n } from '@kanjou/react'
import { FilmIcon, UserIcon, TicketIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Menu() {
  const { t } = useI18n()
  const pathname = usePathname()

  return (
    <div className="bg-background border border-hard rounded-infinite p-[4px] w-full flex">
      <Link
        href="/"
        data-active={pathname === '/'}
        className="flex flex-col flex-1 items-center justify-center rounded-infinite gap-[2px] data-[active=true]:bg-pink-600 data-[active=true]:text-primary-foreground py-[8px]"
      >
        <FilmIcon className="size-[24px]" />
        <p className="font-bold text-[12px] leading-[16px] tracking-[0.5%]">{t('menu.films')}</p>
      </Link>

      <Link
        href="/tickets"
        data-active={pathname === '/tickets'}
        className="flex flex-col flex-1 items-center justify-center rounded-infinite gap-[2px] data-[active=true]:bg-pink-600 data-[active=true]:text-primary-foreground py-[8px]"
      >
        <TicketIcon className="size-[24px]" />
        <p className="font-bold text-[12px] leading-[16px] tracking-[0.5%]">{t('menu.tickets')}</p>
      </Link>

      <Link
        href="/profile"
        data-active={pathname === '/profile'}
        className="flex flex-col flex-1 items-center justify-center rounded-infinite gap-[2px] data-[active=true]:bg-pink-600 data-[active=true]:text-primary-foreground py-[8px]"
      >
        <UserIcon className="size-[24px]" />
        <p className="font-bold text-[12px] leading-[16px] tracking-[0.5%]">{t('menu.profile')}</p>
      </Link>
    </div>
  )
}
