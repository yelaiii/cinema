'use client'

import { useI18n } from '@kanjou/react'
import { BanIcon, CircleCheckIcon, CircleQuestionMarkIcon, TicketIcon } from 'lucide-react'

import type { CinemaTicket } from '@/api'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Typography, typographyVariants } from '@/components/ui/typography'

import { useTicketCard } from './hooks/use-ticket-card'

interface TicketCardProps {
  ticket: CinemaTicket
  i: number
}

export function TicketCard({ ticket, i }: TicketCardProps) {
  const { t, locale } = useI18n()
  const { state, functions, features } = useTicketCard({ ticket })

  return (
    <div className="p-[16px] flex flex-col gap-[4px] border border-border-hard rounded-[24px]">
      <div className="flex justify-between">
        <div>
          <Typography variant="caption" className="text-surface">
            {t('ticket.ticket')}
          </Typography>
          <Typography variant="body-lg">{i}</Typography>
        </div>

        <div className="bg-pink-500 flex items-center justify-center rounded-infinite size-[48px] text-white">
          <TicketIcon size={24} />
        </div>
      </div>

      <Badge type={ticket.status === 'paid' ? 'success' : 'failure'}>
        {ticket.status === 'paid' && (
          <>
            {t('ticket.status.paid')} <CircleCheckIcon size={16} />
          </>
        )}
        {ticket.status === 'cancelled' && (
          <>
            {t('ticket.status.canceled')} <BanIcon size={16} />
          </>
        )}
      </Badge>

      <div>
        <Typography variant="caption" className="text-surface">
          {t('ticket.date-time')}
        </Typography>
        <Typography variant="body-sm">
          {t('ticket.date-time-format', {
            date: state.date.toLocaleDateString(locale, {
              day: 'numeric',
              month: 'long',
            }),
            time: ticket.seance.time,
          })}
        </Typography>
      </div>

      <div>
        <Typography variant="caption" className="text-surface">
          {t('ticket.hall')}
        </Typography>
        <Typography variant="body-sm">{ticket.hall?.name}</Typography>
      </div>

      <div>
        <Typography variant="caption" className="text-surface">
          {t('ticket.seat')}
        </Typography>
        <Typography variant="body-sm">
          {t('common.row-seat-format', { row: ticket.row, seat: ticket.column })}
        </Typography>
      </div>

      {ticket.status === 'paid' && state.date.getTime() > Date.now() && (
        <Drawer open={features.drawer.opened} onOpenChange={features.drawer.toggle}>
          <DrawerTrigger asChild>
            <Button variant="secondary" size="large" className="w-full">
              {t('button.return-ticket')}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex flex-col items-center p-[16px]">
              <CircleQuestionMarkIcon className="size-[80px] fill-neutral-900 stroke-background" />
              <DrawerTitle
                className={typographyVariants({
                  variant: 'title-md',
                  className: 'py-[12px] text-center',
                })}
              >
                {t('ticket.return-confirm')}
              </DrawerTitle>
              <DrawerClose asChild>
                <Button className="w-full" variant="secondary" size="large" type="button">
                  {t('button.cancel')}
                </Button>
              </DrawerClose>
              <Button
                className="w-full mt-[8px]"
                size="large"
                onClick={functions.handleReturnTicket}
                type="button"
              >
                {t('button.return')}
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  )
}
