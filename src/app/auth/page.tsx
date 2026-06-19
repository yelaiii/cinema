'use client'

import z from 'zod'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Loader } from '@/components/ui/loader'
import { Typography } from '@/components/ui/typography'

import { useAuthPage } from './_hooks/use-auth-page'

export default function AuthPage() {
  const { mutations, functions, features } = useAuthPage()

  return (
    <div>
      <div className="md:hidden h-[56px] flex items-center">
        <Typography tag="h1" variant="title-md">
          Авторизация
        </Typography>
      </div>
      <div className="mt-[24px] flex flex-col gap-[24px]">
        <Typography tag="div" variant="body-sm">
          Введите номер телефона для входа в свой профиль
        </Typography>

        <Field>
          <FieldLabel>Телефон</FieldLabel>
          <Input
            type="tel"
            placeholder="+1"
            required
            {...features.phoneField.register({
              validate: (value) =>
                z.e164().safeParse(value).success ? true : 'Неверный номер телефона',
            })}
            aria-invalid={!!features.phoneField.error}
          />
          {features.phoneField.error && <FieldError>{features.phoneField.error}</FieldError>}
        </Field>

        <div className="py-[16px]">
          <Button
            disabled={mutations.createOtp.isLoading}
            onClick={functions.handleSubmit}
            size="large"
            className="w-full"
          >
            Продолжить
            {mutations.createOtp.isLoading && <Loader />}
          </Button>
        </div>
      </div>
    </div>
  )
}
