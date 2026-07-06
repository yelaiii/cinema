'use client'

import { useI18n } from '@kanjou/react'
import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'

import { useContacts } from './hooks/use-contacts'

export function Contacts() {
  const { t } = useI18n()
  const { functions, features } = useContacts()

  return (
    <form onSubmit={functions.handleNext}>
      <div className="md:hidden h-[56px] gap-[16px] flex items-center">
        <ChevronLeft className="cursor-pointer" onClick={functions.handleBack} tabIndex={0} />
        <Typography tag="h1" variant="title-md">
          {t('buy.contacts.title')}
        </Typography>
      </div>

      <div className="mt-[24px]">
        <Typography variant="caption">{t('buy.step-format', { current: 3, total: 4 })}</Typography>
        <div className="relative">
          <div className="absolute w-full bg-muted h-[4px] rounded-[16px]"></div>
          <div className="absolute w-3/4 bg-pink-500 h-[4px] rounded-[16px]"></div>
        </div>
      </div>

      <div className="py-[24px] flex flex-col gap-[16px] pb-40">
        <Field>
          <FieldLabel>{t('input.lastname.label')}</FieldLabel>
          <Input
            {...features.contactsForm.register('lastName')}
            placeholder={t('input.lastname.placeholder')}
            aria-invalid={!!features.contactsForm.formState.errors.lastName}
          />
          {!!features.contactsForm.formState.errors.lastName && (
            <FieldError>{t(features.contactsForm.formState.errors.lastName.message!)}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>{t('input.firstname.label')}</FieldLabel>
          <Input
            {...features.contactsForm.register('firstName')}
            placeholder={t('input.firstname.placeholder')}
            aria-invalid={!!features.contactsForm.formState.errors.firstName}
          />
          {!!features.contactsForm.formState.errors.firstName && (
            <FieldError>{t(features.contactsForm.formState.errors.firstName.message!)}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>{t('input.middlename.label')}</FieldLabel>
          <Input
            {...features.contactsForm.register('middleName')}
            placeholder={t('input.middlename.placeholder')}
            aria-invalid={!!features.contactsForm.formState.errors.middleName}
          />
          {!!features.contactsForm.formState.errors.middleName && (
            <FieldError>{t(features.contactsForm.formState.errors.middleName.message!)}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>{t('input.city.label')}</FieldLabel>
          <Input
            {...features.contactsForm.register('city')}
            placeholder={t('input.city.placeholder')}
            aria-invalid={!!features.contactsForm.formState.errors.city}
          />
          {!!features.contactsForm.formState.errors.city && (
            <FieldError>{t(features.contactsForm.formState.errors.city.message!)}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>{t('input.phone.label')}</FieldLabel>
          <Input
            type="tel"
            {...features.contactsForm.register('phone')}
            placeholder={t('input.phone.placeholder')}
            aria-invalid={!!features.contactsForm.formState.errors.phone}
          />
          {!!features.contactsForm.formState.errors.phone && (
            <FieldError>{t(features.contactsForm.formState.errors.phone.message!)}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>{t('input.email.label')}</FieldLabel>
          <Input
            type="email"
            {...features.contactsForm.register('email')}
            placeholder={t('input.email.placeholder')}
            aria-invalid={!!features.contactsForm.formState.errors.email}
          />
          {!!features.contactsForm.formState.errors.email && (
            <FieldError>{t(features.contactsForm.formState.errors.email.message!)}</FieldError>
          )}
        </Field>
      </div>

      <Button
        type="submit"
        disabled={!features.contactsForm.formState.isValid}
        size="large"
        className="w-[unset] bottom-[20px] right-[20px] left-[20px] fixed"
      >
        {t('button.continue')}
      </Button>
    </form>
  )
}
