'use client'

import { useI18n } from '@kanjou/react'
import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Loader } from '@/components/ui/loader'
import { Typography } from '@/components/ui/typography'

import { usePay } from './hooks/use-pay'

export function Pay() {
  const { t } = useI18n()
  const { functions, mutations, features } = usePay()

  return (
    <form onSubmit={functions.handleNext}>
      <div className="md:hidden h-[56px] gap-[16px] flex items-center">
        <ChevronLeft className="cursor-pointer" onClick={functions.handleBack} tabIndex={0} />
        <Typography tag="h1" variant="title-md">
          {t('buy.pay.title')}
        </Typography>
      </div>

      <div className="mt-[24px]">
        <Typography variant="caption">{t('buy.step-format', { current: 4, total: 4 })}</Typography>
        <div className="relative">
          <div className="absolute w-full bg-muted h-[4px] rounded-[16px]"></div>
          <div className="absolute w-full bg-pink-500 h-[4px] rounded-[16px]"></div>
        </div>
      </div>

      <div className="bg-secondary mt-[24px] rounded-[24px] p-[24px] grid grid-cols-2 gap-x-[24px] gap-y-[24px]">
        <Field className="col-span-2">
          <FieldLabel>{t('input.pan.label')}</FieldLabel>
          <Input
            {...features.payForm.register('pan')}
            placeholder={t('input.pan.placeholder')}
            aria-invalid={!!features.payForm.formState.errors.pan}
          />
          {!!features.payForm.formState.errors.pan && (
            <FieldError>{t(features.payForm.formState.errors.pan.message!)}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>{t('input.expire-date.label')}</FieldLabel>
          <Input
            {...features.payForm.register('expireDate')}
            placeholder={t('input.expire-date.placeholder')}
            aria-invalid={!!features.payForm.formState.errors.expireDate}
          />
          {!!features.payForm.formState.errors.expireDate && (
            <FieldError>{t(features.payForm.formState.errors.expireDate.message!)}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>{t('input.cvv.label')}</FieldLabel>
          <Input
            {...features.payForm.register('cvv')}
            placeholder={t('input.cvv.placeholder')}
            type="password"
            aria-invalid={!!features.payForm.formState.errors.cvv}
          />
          {!!features.payForm.formState.errors.cvv && (
            <FieldError>{t(features.payForm.formState.errors.cvv.message!)}</FieldError>
          )}
        </Field>
      </div>

      <Button
        type="submit"
        size="large"
        disabled={mutations.payment.isLoading}
        className="w-[unset] bottom-[20px] right-[20px] left-[20px] fixed"
      >
        {t('button.pay')}
        {mutations.payment.isLoading && <Loader />}
      </Button>
    </form>
  )
}
