'use client'

import { useI18n } from '@kanjou/react'
import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Loader } from '@/components/ui/loader'
import { Typography } from '@/components/ui/typography'

import { useOtpStep } from './hooks/use-otp-step'

export function OtpStep() {
  const { t } = useI18n()
  const { mutations, functions, features } = useOtpStep()

  return (
    <div>
      <div className="md:hidden h-[56px] gap-[16px] flex items-center">
        <button onClick={functions.handleBack}>
          <ChevronLeft />
        </button>
        <Typography tag="h1" variant="title-md">
          {t('auth.otp.title')}
        </Typography>
      </div>
      <div className="mt-[24px] flex flex-col gap-[24px]">
        <Typography tag="div" variant="body-sm">
          {t('auth.otp.description')}
        </Typography>

        <Field>
          <FieldLabel>{t('input.otp.label')}</FieldLabel>
          <Input
            placeholder={t('input.otp.placeholder')}
            {...features.otpField.register({
              pattern: { value: /^\d{6}$/, message: 'validation.invalid-otp' },
            })}
            aria-invalid={!!features.otpField.error}
          />
          {features.otpField.error && <FieldError>{t(features.otpField.error)}</FieldError>}
        </Field>

        <div className="py-[16px] flex flex-col gap-[10px]">
          <Button
            disabled={mutations.signIn.isLoading}
            onClick={functions.handleOtpSubmit}
            size="large"
            className="w-full"
          >
            {t('button.sign-in')}
            {mutations.signIn.isLoading && <Loader />}
          </Button>
          <Button
            disabled={mutations.createOtp.isLoading || features.timer.active}
            onClick={functions.handleResend}
            variant="secondary"
            size="large"
            className="w-full"
          >
            {!features.timer.active && <>{t('button.resend-otp')}</>}
            {features.timer.active && (
              <>
                {t('button.resend-otp-timer', {
                  time: features.timer.seconds + features.timer.minutes * 60,
                })}
              </>
            )}
            {mutations.createOtp.isLoading && <Loader />}
          </Button>
        </div>
      </div>
    </div>
  )
}
