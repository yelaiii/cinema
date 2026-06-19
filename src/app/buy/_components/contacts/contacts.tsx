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
    <form onSubmit={functions.handleNext}>
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
            {...features.contactsForm.register('lastName')}
            placeholder="Иванов"
            required
            aria-invalid={!!features.contactsForm.formState.errors.lastName}
          />
          {!!features.contactsForm.formState.errors.lastName && (
            <FieldError>{features.contactsForm.formState.errors.lastName.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Имя</FieldLabel>
          <Input
            {...features.contactsForm.register('firstName')}
            placeholder="Иван"
            required
            aria-invalid={!!features.contactsForm.formState.errors.firstName}
          />
          {!!features.contactsForm.formState.errors.firstName && (
            <FieldError>{features.contactsForm.formState.errors.firstName.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Отчество</FieldLabel>
          <Input
            {...features.contactsForm.register('middleName')}
            placeholder="Иванович"
            required
            aria-invalid={!!features.contactsForm.formState.errors.middleName}
          />
          {!!features.contactsForm.formState.errors.middleName && (
            <FieldError>{features.contactsForm.formState.errors.middleName.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Город</FieldLabel>
          <Input
            {...features.contactsForm.register('city')}
            placeholder="Мюнхен"
            required
            aria-invalid={!!features.contactsForm.formState.errors.city}
          />
          {!!features.contactsForm.formState.errors.city && (
            <FieldError>{features.contactsForm.formState.errors.city.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Телефон</FieldLabel>
          <Input
            type="tel"
            {...features.contactsForm.register('phone')}
            placeholder="+1"
            required
            aria-invalid={!!features.contactsForm.formState.errors.phone}
          />
          {!!features.contactsForm.formState.errors.phone && (
            <FieldError>{features.contactsForm.formState.errors.phone.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            type="email"
            {...features.contactsForm.register('email')}
            required
            placeholder="Email"
            aria-invalid={!!features.contactsForm.formState.errors.email}
          />
          {!!features.contactsForm.formState.errors.email && (
            <FieldError>{features.contactsForm.formState.errors.email.message}</FieldError>
          )}
        </Field>
      </div>

      <Button
        type="submit"
        disabled={!features.contactsForm.formState.isValid}
        size="large"
        className="w-[unset] bottom-[20px] right-[20px] left-[20px] fixed"
      >
        Продолжить
      </Button>
    </form>
  )
}
