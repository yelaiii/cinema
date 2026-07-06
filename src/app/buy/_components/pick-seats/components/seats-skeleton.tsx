import { useI18n } from '@kanjou/react'

import { Loader } from '@/components/ui/loader'
import { Typography } from '@/components/ui/typography'

export function SeatsSkeleton() {
  const { t } = useI18n()

  return (
    <div className="mt-[24px] w-full animate-pulse relative">
      <div className="flex justify-center items-center absolute inset-0 py-[48px] bg-background/50 z-10">
        <Loader />
      </div>
      <Typography variant="body-sm" className="opacity-50">
        {t('buy.pick-seats.row')}
      </Typography>
      <div className="overflow-x-auto py-[12px] opacity-20">
        <div className="flex flex-col gap-y-[24px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-[4px] relative pl-[24px]">
              <Typography variant="caption" className="absolute left-0 top-1/2 -translate-y-1/2">
                {i + 1}
              </Typography>
              {Array.from({ length: 10 }).map((_, j) => (
                <div key={j} className="w-[24px] h-[24px] rounded-[4px] bg-neutral-300 shrink-0" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
