'use client'

import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Loader } from '@/components/ui/loader'
import { Typography } from '@/components/ui/typography'

import { useOtpPage } from './_hooks/use-sign-in-page'

function OtpPageContent() {
  const { state, mutations, functions, features } = useOtpPage()

  return (
    <div>
      <div className="md:hidden h-[56px] gap-[16px] flex items-center">
        <Link href={`/auth?${state.searchParams}`}>
          <ChevronLeft />
        </Link>
        <Typography tag="h1" variant="title-md">
          Проверочный код
        </Typography>
      </div>
      <div className="mt-[24px] flex flex-col gap-[24px]">
        <Typography tag="div" variant="body-sm">
          На указзанный вами номер был отправлен проверочный код
        </Typography>

        <Field>
          <FieldLabel>Код</FieldLabel>
          <Input
            placeholder="Проверочный код"
            {...features.otpField.register({
              pattern: {
                value: /^\d{6}$/,
                message: 'Неверный код',
              },
            })}
            aria-invalid={!!features.otpField.error}
          />
          {features.otpField.error && <FieldError>{features.otpField.error}</FieldError>}
        </Field>

        <div className="py-[16px] flex flex-col gap-[10px]">
          <Button
            disabled={mutations.signIn.isLoading}
            onClick={functions.handleSubmit}
            size="large"
            className="w-full"
          >
            Войти
            {mutations.signIn.isLoading && <Loader />}
          </Button>
          <Button
            disabled={mutations.resendOtp.isLoading || features.timer.active}
            onClick={functions.handleResend}
            variant="secondary"
            size="large"
            className="w-full"
          >
            {!features.timer.active && <>Отправить код повторно</>}
            {features.timer.active && (
              <>
                Отправить код повторно через {features.timer.seconds + features.timer.minutes * 60}{' '}
                сек
              </>
            )}
            {mutations.resendOtp.isLoading && <Loader />}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function OtpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center py-[48px]">
          <Loader />
        </div>
      }
    >
      <OtpPageContent />
    </Suspense>
  )
}
