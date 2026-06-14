'use client'

import { Popover } from '@base-ui/react/popover'
import { ChevronLeft, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/utils/cn'

import { SeatsSkeleton } from './components/seats-skeleton'
import { usePickSeats } from './hooks/use-pick-seats'

export interface HallSeat {
  row: number
  column: number
}

export function PickSeats() {
  const { state, queries, functions } = usePickSeats()

  return (
    <div>
      <div className="md:hidden h-[56px] gap-[16px] flex items-center">
        <ChevronLeft className="cursor-pointer" onClick={functions.handleBack} tabIndex={0} />
        <Typography tag="h1" variant="title-md">
          Выбор места
        </Typography>
      </div>

      <div className="mt-[24px]">
        <Typography variant="caption">Шаг 1 из 4</Typography>
        <div className="relative">
          <div className="absolute w-full bg-muted h-[4px] rounded-[16px]"></div>
          <div className="absolute w-1/4 bg-pink-500 h-[4px] rounded-[16px]"></div>
        </div>
      </div>

      {queries.schedule.isLoading && <SeatsSkeleton />}

      {!queries.schedule.isLoading && state.seats && (
        <div className="mt-[24px] w-full">
          <Typography variant="body-sm">Ряд</Typography>
          <div className="overflow-x-auto scale-y-[-1] py-[12px]">
            <div className="flex flex-col gap-y-[24px] scale-y-[-1]">
              {state.seats.map((row, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-[4px] relative pl-[24px]"
                >
                  <Typography
                    variant="caption"
                    className="absolute left-0 top-1/2 -translate-y-1/2"
                  >
                    {i + 1}
                  </Typography>
                  {row.map((seat, j) => (
                    <Popover.Root key={j}>
                      <Popover.Trigger
                        openOnHover
                        aria-label="Подробнее"
                        data-selected={
                          state.selectedSeats.some((s) => s.row === i && s.column === j) ||
                          undefined
                        }
                        disabled={seat.type === 'BLOCKED'}
                        render={({ onClick, className, ...props }) => (
                          <button
                            {...props}
                            className={cn(
                              className,
                              'w-[24px] h-[24px] rounded-[4px] bg-neutral-300 disabled:cursor-auto cursor-pointer disabled:bg-neutral-900 data-[selected]:bg-pink-200 shrink-0',
                            )}
                            onClick={async (event) => {
                              await functions.handleSeatClick(i, j)
                              onClick?.(event)
                            }}
                          />
                        )}
                      />
                      <Popover.Portal>
                        <Popover.Positioner sideOffset={9} side="bottom">
                          <Popover.Popup className="bg-primary rounded-[8px] px-[8px] py-[6px] relative">
                            <Popover.Arrow
                              render={(props) => (
                                <div
                                  className="rotate-[45deg] bg-primary size-[12px] rounded-[1px] absolute top-[-5px]"
                                  {...props}
                                />
                              )}
                            />
                            <div className="flex justify-between text-primary-foreground items-center">
                              <p className="font-500 text-[12px] leading-[16px] tracking-[0.5%]">
                                $ {seat.price}
                              </p>
                              <Popover.Close
                                nativeButton={false}
                                render={(props) => (
                                  <XIcon
                                    {...props}
                                    className="size-[16px] text-primary-foreground cursor-pointer"
                                  />
                                )}
                              />
                            </div>
                            <p className="font-500 text-[12px] leading-[16px] tracking-[0.5%] text-muted-foreground">
                              {i + 1} ряд, {j + 1} место
                            </p>
                          </Popover.Popup>
                        </Popover.Positioner>
                      </Popover.Portal>
                    </Popover.Root>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-[24px]">
        <div className="flex items-center">
          <div className="size-[24px] bg-neutral-900 rounded-[4px] mr-[8px]" />
          <Typography variant="body-sm">Заняты</Typography>
        </div>
        <div className="flex items-center">
          <div className="size-[24px] bg-pink-200 rounded-[4px] mr-[8px]" />
          <Typography variant="body-sm">Выбраны</Typography>
        </div>
        <div className="flex items-center">
          <div className="size-[24px] bg-neutral-200 rounded-[4px] mr-[8px]" />
          <Typography variant="body-sm">Доступны</Typography>
        </div>
      </div>

      <Button
        onClick={functions.handleNext}
        size="large"
        disabled={!state.selectedSeats.length}
        className="w-[unset] bottom-[20px] right-[20px] left-[20px] fixed"
      >
        Продолжить
      </Button>
    </div>
  )
}
