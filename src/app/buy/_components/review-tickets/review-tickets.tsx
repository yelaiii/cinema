'use client'

import { useI18n } from '@kanjou/react'
import { ChevronLeft, TicketIcon } from 'lucide-react'

import { parseDDMMYY } from '@/app/_utils/parse-date-string'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import { useReviewTickets } from './hooks/use-review-tickets'

export function ReviewTickets() {
  const { t, locale } = useI18n()
  const { state, functions } = useReviewTickets()

  return (
    <div>
      <div className="md:hidden h-[56px] gap-[16px] flex items-center">
        <ChevronLeft className="cursor-pointer" onClick={functions.handleBack} tabIndex={0} />
        <Typography tag="h1" variant="title-md">
          {t('buy.review-tickets.title')}
        </Typography>
      </div>

      <div className="mt-[24px]">
        <Typography variant="caption">{t('buy.step-format', { current: 2, total: 4 })}</Typography>
        <div className="relative">
          <div className="absolute w-full bg-muted h-[4px] rounded-[16px]"></div>
          <div className="absolute w-2/4 bg-pink-500 h-[4px] rounded-[16px]"></div>
        </div>
      </div>

      <div className="mt-[24px]">
        <Typography variant="caption" className="text-surface">
          {t('buy.review-tickets.film-name')}
        </Typography>
        <Typography variant="body-lg">{state.filmName}</Typography>
      </div>

      <div className="mt-[12px] flex flex-col gap-[12px]">
        {state.seats?.map((seat, i) => (
          <div
            key={i}
            className="p-[16px] flex flex-col gap-[4px] border border-border-hard rounded-[24px]"
          >
            <div className="flex justify-between">
              <div>
                <Typography variant="caption" className="text-surface">
                  {t('ticket.ticket')}
                </Typography>
                <Typography variant="body-lg">{i + 1}</Typography>
              </div>

              <div className="bg-pink-500 flex items-center justify-center rounded-infinite size-[48px] text-white">
                <TicketIcon size={24} />
              </div>
            </div>

            <div>
              <Typography variant="caption" className="text-surface">
                {t('ticket.date-time')}
              </Typography>
              <Typography variant="body-sm">
                {state.date &&
                  t('ticket.date-time-format', {
                    date: parseDDMMYY(state.date).toLocaleDateString(locale, {
                      day: 'numeric',
                      month: 'long',
                    }),
                    time: state.time || '',
                  })}
              </Typography>
            </div>

            <div>
              <Typography variant="caption" className="text-surface">
                {t('ticket.hall')}
              </Typography>
              <Typography variant="body-sm">{state.hallName}</Typography>
            </div>

            <div>
              <Typography variant="caption" className="text-surface">
                {t('ticket.seat')}
              </Typography>
              <Typography variant="body-sm">
                {t('common.row-seat-format', { row: seat.row, seat: seat.column })}
              </Typography>
            </div>
          </div>
        ))}
      </div>

      <Typography variant="title-lg" className="mt-[12px] pb-[100px]">
        {t('buy.review-tickets.total-price', { price: state.fullPrice })}
      </Typography>

      <Button
        onClick={functions.handleNext}
        size="large"
        className="w-[unset] bottom-[20px] right-[20px] left-[20px] fixed"
      >
        {t('button.buy-tickets')}
      </Button>
    </div>
  )
}
