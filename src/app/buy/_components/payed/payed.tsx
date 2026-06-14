'use client'

import { Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { parseDDMMYY } from '@/utils/parse-date-string'

import { usePayed } from './hooks/use-payed'

export function Payed() {
  const { state, functions } = usePayed()

  return (
    <div className="pb-[140px] flex flex-col items-center">
      <div className="flex justify-center mt-[40px]">
        <div className="bg-pink-500 text-white flex items-center justify-center rounded-infinite size-[56px]">
          <Check size={32} className="stroke-[3]" />
        </div>
      </div>

      <Typography tag="h1" variant="title-md" className="text-center font-bold mt-[28px] px-[16px]">
        Оплата прошла успешно
      </Typography>

      <div className="mt-[16px] flex flex-col gap-[16px] w-full max-w-[400px] px-[16px]">
        <div>
          <Typography variant="caption" className="text-surface block mb-[4px]">
            Количество билетов
          </Typography>
          <Typography variant="body-sm" className="font-semibold text-primary">
            {state.seats!.length}
          </Typography>
        </div>

        <div>
          <Typography variant="caption" className="text-surface block mb-[4px]">
            Фильм
          </Typography>
          <Typography variant="body-sm" className="font-semibold text-primary">
            {state.filmName}
          </Typography>
        </div>

        <div>
          <Typography variant="caption" className="text-surface block mb-[4px]">
            Дата и время
          </Typography>
          <Typography variant="body-sm" className="font-semibold text-primary">
            {parseDDMMYY(state.date!).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
            })}{' '}
            в {state.time}
          </Typography>
        </div>

        <div>
          <Typography variant="caption" className="text-surface block mb-[4px]">
            Зал
          </Typography>
          <Typography variant="body-sm" className="font-semibold text-primary">
            {state.hallName}
          </Typography>
        </div>

        <div>
          <Typography variant="caption" className="text-surface block mb-[4px]">
            Места
          </Typography>
          <Typography variant="body-sm" className="font-semibold text-primary">
            {state.formattedSeats}
          </Typography>
        </div>

        <div>
          <Typography variant="caption" className="text-surface block mb-[4px]">
            Номера билетов
          </Typography>
          <Typography variant="body-sm" className="font-semibold text-primary">
            {state.formattedTicketIds}
          </Typography>
        </div>

        <div className="rounded-full w-full h-[1px] bg-secondary" />

        <Typography variant="body-sm" className="text-surface">
          Вся информация была продублирована в SMS
        </Typography>
      </div>

      <div className="bottom-[20px] right-[20px] left-[20px] fixed flex flex-col gap-[8px] md:relative md:bottom-auto md:left-auto md:right-auto md:w-full md:max-w-[400px] md:mt-[32px]">
        <Button
          variant="secondary"
          size="large"
          className="w-full"
          onClick={functions.handleGoToDetails}
        >
          Детали заказа
        </Button>
        <Button
          variant="default"
          size="large"
          className="w-full"
          onClick={functions.handleGoToHome}
        >
          На главную
        </Button>
      </div>
    </div>
  )
}
