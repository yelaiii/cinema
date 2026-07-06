'use client'

import { useI18n } from '@kanjou/react'
import z from 'zod'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Loader } from '@/components/ui/loader'
import { Typography } from '@/components/ui/typography'

import { usePhoneStep } from './hooks/use-phone-step'

export function PhoneStep() {
  const { t } = useI18n()
  const { mutations, functions, features } = usePhoneStep()

  return (
    <div>
      <div className="md:hidden h-[56px] flex items-center">
        <Typography tag="h1" variant="title-md">
          {t('auth.title')}
        </Typography>
      </div>
      <div className="mt-[24px] flex flex-col gap-[24px]">
        <Typography tag="div" variant="body-sm">
          {t('auth.description')}
        </Typography>

        <Field>
          <FieldLabel>{t('input.phone.label')}</FieldLabel>
          <Input
            type="tel"
            placeholder={t('input.phone.placeholder')}
            required
            {...features.phoneField.register({
              validate: (value) =>
                z.e164().safeParse(value).success ? true : 'validation.invalid-phone',
            })}
            aria-invalid={!!features.phoneField.error}
          />
          {features.phoneField.error && <FieldError>{t(features.phoneField.error)}</FieldError>}
        </Field>

        <div className="py-[16px]">
          <Button
            disabled={mutations.createOtp.isLoading}
            onClick={functions.handlePhoneSubmit}
            size="large"
            className="w-full"
          >
            {t('button.continue')}
            {mutations.createOtp.isLoading && <Loader />}
          </Button>
        </div>
      </div>
    </div>
  )
}
