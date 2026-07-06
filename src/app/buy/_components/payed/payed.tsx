'use client'

import { useI18n } from '@kanjou/react'
import { Check } from 'lucide-react'

import { parseDDMMYY } from '@/app/_utils/parse-date-string'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import { usePayed } from './hooks/use-payed'

export function Payed() {
  const { t, locale } = useI18n()
  const { state, functions } = usePayed()

  return (
    <div className="pb-[140px] flex flex-col items-center">
      <div className="flex justify-center mt-[40px]">
        <div className="bg-pink-500 text-white flex items-center justify-center rounded-infinite size-[56px]">
          <Check size={32} className="stroke-[3]" />
        </div>
      </div>

      <Typography tag="h1" variant="title-md" className="text-center font-bold mt-[28px] px-[16px]">
        {t('buy.payed.success')}
      </Typography>

      <div className="mt-[16px] flex flex-col gap-[16px] w-full max-w-[400px] px-[16px]">
        <div>
          <Typography variant="caption" className="text-surface block mb-[4px]">
            {t('buy.payed.tickets-count')}
          </Typography>
          <Typography variant="body-sm" className="font-semibold text-primary">
            {state.seats!.length}
          </Typography>
        </div>

        <div>
          <Typography variant="caption" className="text-surface block mb-[4px]">
            {t('buy.payed.film')}
          </Typography>
          <Typography variant="body-sm" className="font-semibold text-primary">
            {state.filmName}
          </Typography>
        </div>

        <div>
          <Typography variant="caption" className="text-surface block mb-[4px]">
            {t('ticket.date-time')}
          </Typography>
          <Typography variant="body-sm" className="font-semibold text-primary">
            {t('ticket.date-time-format', {
              date: parseDDMMYY(state.date!).toLocaleDateString(locale, {
                day: 'numeric',
                month: 'long',
              }),
              time: state.time || '',
            })}
          </Typography>
        </div>

        <div>
          <Typography variant="caption" className="text-surface block mb-[4px]">
            {t('ticket.hall')}
          </Typography>
          <Typography variant="body-sm" className="font-semibold text-primary">
            {state.hallName}
          </Typography>
        </div>

        <div>
          <Typography variant="caption" className="text-surface block mb-[4px]">
            {t('buy.payed.seats')}
          </Typography>
          <Typography variant="body-sm" className="font-semibold text-primary">
            {state.formattedSeats}
          </Typography>
        </div>

        <div>
          <Typography variant="caption" className="text-surface block mb-[4px]">
            {t('buy.payed.ticket-numbers')}
          </Typography>
          <Typography variant="body-sm" className="font-semibold text-primary">
            {state.formattedTicketIds}
          </Typography>
        </div>

        <div className="rounded-full w-full h-[1px] bg-secondary" />

        <Typography variant="body-sm" className="text-surface">
          {t('buy.payed.sms-sent')}
        </Typography>
      </div>

      <div className="bottom-[20px] right-[20px] left-[20px] fixed flex flex-col gap-[8px] md:relative md:bottom-auto md:left-auto md:right-auto md:w-full md:max-w-[400px] md:mt-[32px]">
        <Button
          variant="secondary"
          size="large"
          className="w-full"
          onClick={functions.handleGoToDetails}
        >
          {t('button.order-details')}
        </Button>
        <Button
          variant="default"
          size="large"
          className="w-full"
          onClick={functions.handleGoToHome}
        >
          {t('button.go-home')}
        </Button>
      </div>
    </div>
  )
}
