'use client'

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
  const { state, functions, features } = useTicketCard({ ticket })

  return (
    <div className="p-[16px] flex flex-col gap-[4px] border border-border-hard rounded-[24px]">
      <div className="flex justify-between">
        <div>
          <Typography variant="caption" className="text-surface">
            Билет
          </Typography>
          <Typography variant="body-lg">{i}</Typography>
        </div>

        <div className="bg-pink-500 flex items-center justify-center rounded-infinite size-[48px] text-white">
          <TicketIcon size={24} />
        </div>
      </div>

      <Badge type={ticket.status === 'PAYED' ? 'success' : 'failure'}>
        {ticket.status === 'PAYED' && (
          <>
            оплачен <CircleCheckIcon size={16} />
          </>
        )}
        {ticket.status === 'CANCELED' && (
          <>
            отменён <BanIcon size={16} />
          </>
        )}
      </Badge>

      <div>
        <Typography variant="caption" className="text-surface">
          Дата и врёмя
        </Typography>
        <Typography variant="body-sm">
          {state.date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
          })}{' '}
          в {ticket.seance.time}
        </Typography>
      </div>

      <div>
        <Typography variant="caption" className="text-surface">
          Зал
        </Typography>
        <Typography variant="body-sm">{ticket.hall?.name}</Typography>
      </div>

      <div>
        <Typography variant="caption" className="text-surface">
          Место
        </Typography>
        <Typography variant="body-sm">
          {ticket.row} ряд, {ticket.column} место
        </Typography>
      </div>

      {ticket.status === 'PAYED' && state.date.getTime() > Date.now() && (
        <Drawer open={features.drawer.opened} onOpenChange={features.drawer.toggle}>
          <DrawerTrigger asChild>
            <Button variant="secondary" size="large" className="w-full">
              Вернуть билет
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
                Вы уверены, что хотите вернуть билет?
              </DrawerTitle>
              <DrawerClose asChild>
                <Button className="w-full" variant="secondary" size="large" type="button">
                  Отменить
                </Button>
              </DrawerClose>
              <Button
                className="w-full mt-[8px]"
                size="large"
                onClick={functions.handleReturnTicket}
                type="button"
              >
                Вернуть
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  )
}
