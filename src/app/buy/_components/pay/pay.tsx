'use client'

import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Loader } from '@/components/ui/loader'
import { Typography } from '@/components/ui/typography'

import { usePay } from './hooks/use-pay'

export function Pay() {
  const { functions, mutations, features } = usePay()

  return (
    <div>
      <div className="md:hidden h-[56px] gap-[16px] flex items-center">
        <ChevronLeft className="cursor-pointer" onClick={functions.handleBack} tabIndex={0} />
        <Typography tag="h1" variant="title-md">
          Оплата
        </Typography>
      </div>

      <div className="mt-[24px]">
        <Typography variant="caption">Шаг 4 из 4</Typography>
        <div className="relative">
          <div className="absolute w-full bg-muted h-[4px] rounded-[16px]"></div>
          <div className="absolute w-full bg-pink-500 h-[4px] rounded-[16px]"></div>
        </div>
      </div>

      <div className="bg-secondary mt-[24px] rounded-[24px] p-[24px] grid grid-cols-2  gap-x-[24px] gap-y-[24px]">
        <Field className="col-span-2">
          <FieldLabel>Номер карты*</FieldLabel>
          <Input
            {...features.panField.register({
              pattern: {
                value: /^(?: *\d){16} *$/,
                message: 'Неверный формат карты',
              },
            })}
            placeholder="0000 0000 0000 0000"
            aria-invalid={!!features.panField.error}
          />
          {features.panField.error && <FieldError>{features.panField.error}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Срок действия*</FieldLabel>
          <Input
            {...features.expireDateField.register({
              pattern: {
                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                message: 'Формат должен быть ММ/ГГ',
              },
            })}
            placeholder="00/00"
            aria-invalid={!!features.expireDateField.error}
          />
          {features.expireDateField.error && (
            <FieldError>{features.expireDateField.error}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>CVV*</FieldLabel>
          <Input
            {...features.cvvField.register({
              pattern: {
                value: /^\d{3}$/,
                message: 'CVV должен состоять из 3 цифр',
              },
            })}
            placeholder="000"
            type="password"
            aria-invalid={!!features.cvvField.error}
          />
          {features.cvvField.error && <FieldError>{features.cvvField.error}</FieldError>}
        </Field>
      </div>

      <Button
        onClick={functions.handleNext}
        size="large"
        disabled={mutations.payment.isLoading}
        className="w-[unset] bottom-[20px] right-[20px] left-[20px] fixed"
      >
        Оплатить
        {mutations.payment.isLoading && <Loader />}
      </Button>
    </div>
  )
}
