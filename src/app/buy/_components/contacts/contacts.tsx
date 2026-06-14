'use client'

import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'

import { useContacts } from './hooks/use-contacts'

export function Contacts() {
  const { functions, features } = useContacts()

  return (
    <div>
      <div className="md:hidden h-[56px] gap-[16px] flex items-center">
        <ChevronLeft className="cursor-pointer" onClick={functions.handleBack} tabIndex={0} />
        <Typography tag="h1" variant="title-md">
          Ваши данные
        </Typography>
      </div>

      <div className="mt-[24px]">
        <Typography variant="caption">Шаг 3 из 4</Typography>
        <div className="relative">
          <div className="absolute w-full bg-muted h-[4px] rounded-[16px]"></div>
          <div className="absolute w-3/4 bg-pink-500 h-[4px] rounded-[16px]"></div>
        </div>
      </div>

      <div className="py-[24px] flex flex-col gap-[16px] pb-40">
        <Field>
          <FieldLabel>Фамилия</FieldLabel>
          <Input
            {...features.lastNameField.register()}
            placeholder="Иванов"
            aria-invalid={!!features.lastNameField.error}
          />
          {features.lastNameField.error && <FieldError>{features.lastNameField.error}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Имя</FieldLabel>
          <Input
            {...features.firstNameField.register()}
            placeholder="Иван"
            aria-invalid={!!features.firstNameField.error}
          />
          {features.firstNameField.error && (
            <FieldError>{features.firstNameField.error}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Отчество</FieldLabel>
          <Input
            {...features.middleNameField.register()}
            placeholder="Иванович"
            aria-invalid={!!features.middleNameField.error}
          />
          {features.middleNameField.error && (
            <FieldError>{features.middleNameField.error}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Город</FieldLabel>
          <Input
            {...features.cityField.register()}
            placeholder="Мюнхен"
            aria-invalid={!!features.cityField.error}
          />
          {features.cityField.error && <FieldError>{features.cityField.error}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Телефон</FieldLabel>
          <Input
            {...features.phoneField.register({
              pattern: {
                value: /^(\+?\d{1,3})?[-.\s]?(\(?\d{3}\)?)[-.\s]?\d{3}[-.\s]?\d{2,4}$/,
                message: 'Неверный номер телефона',
              },
            })}
            placeholder="+1"
            aria-invalid={!!features.phoneField.error}
          />
          {features.phoneField.error && <FieldError>{features.phoneField.error}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            {...features.emailField.register({
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Некорректный email',
              },
            })}
            placeholder="Email"
            aria-invalid={!!features.emailField.error}
          />
          {features.emailField.error && <FieldError>{features.emailField.error}</FieldError>}
        </Field>
      </div>

      <Button
        onClick={functions.handleNext}
        disabled={
          !features.lastNameField ||
          !features.firstNameField ||
          !features.middleNameField ||
          !features.cityField ||
          !features.phoneField ||
          !features.emailField
        }
        size="large"
        className="w-[unset] bottom-[20px] right-[20px] left-[20px] fixed"
      >
        Продолжить
      </Button>
    </div>
  )
}
