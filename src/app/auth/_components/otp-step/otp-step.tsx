import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Loader } from '@/components/ui/loader'
import { Typography } from '@/components/ui/typography'

import { useOtpStep } from './hooks/use-otp-step'

export function OtpStep() {
  const { mutations, functions, features } = useOtpStep()

  return (
    <div>
      <div className="md:hidden h-[56px] gap-[16px] flex items-center">
        <button onClick={functions.handleBack}>
          <ChevronLeft />
        </button>
        <Typography tag="h1" variant="title-md">
          Проверочный код
        </Typography>
      </div>
      <div className="mt-[24px] flex flex-col gap-[24px]">
        <Typography tag="div" variant="body-sm">
          На указанный вами номер был отправлен проверочный код
        </Typography>

        <Field>
          <FieldLabel>Код</FieldLabel>
          <Input
            placeholder="Проверочный код"
            {...features.otpField.register({
              pattern: { value: /^\d{6}$/, message: 'Неверный код' },
            })}
            aria-invalid={!!features.otpField.error}
          />
          {features.otpField.error && <FieldError>{features.otpField.error}</FieldError>}
        </Field>

        <div className="py-[16px] flex flex-col gap-[10px]">
          <Button
            disabled={mutations.signIn.isLoading}
            onClick={functions.handleOtpSubmit}
            size="large"
            className="w-full"
          >
            Войти
            {mutations.signIn.isLoading && <Loader />}
          </Button>
          <Button
            disabled={mutations.createOtp.isLoading || features.timer.active}
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
            {mutations.createOtp.isLoading && <Loader />}
          </Button>
        </div>
      </div>
    </div>
  )
}
