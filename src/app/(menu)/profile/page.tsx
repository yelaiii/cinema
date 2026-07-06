'use client'

import { useI18n } from '@kanjou/react'
import { CircleQuestionMarkIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from '@/components/ui/drawer'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Typography, typographyVariants } from '@/components/ui/typography'

import { useProfilePage } from './_hooks/use-profile-page'

export default function ProfilePage() {
  const { t } = useI18n()
  const { state, functions, features } = useProfilePage()

  return (
    <div>
      <div className="md:hidden h-[56px] flex items-center">
        <Typography tag="h1" variant="title-md">
          {t('menu.profile')}
        </Typography>
      </div>

      <form
        id="profile-form"
        className="py-[24px] flex flex-col gap-[16px]"
        onSubmit={features.profileForm.handleSubmit(functions.handleUpdateProfile)}
      >
        <Field>
          <FieldLabel>{t('input.lastname.label')}</FieldLabel>
          <Input
            {...features.profileForm.register('lastName')}
            placeholder={t('input.lastname.placeholder')}
            aria-invalid={!!features.profileForm.formState.errors.lastName}
          />
          {features.profileForm.formState.errors.lastName?.message && (
            <FieldError>{t(features.profileForm.formState.errors.lastName.message!)}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>{t('input.firstname.label')}</FieldLabel>
          <Input
            {...features.profileForm.register('firstName')}
            placeholder={t('input.firstname.placeholder')}
            aria-invalid={!!features.profileForm.formState.errors.firstName}
          />
          {features.profileForm.formState.errors.firstName?.message && (
            <FieldError>{t(features.profileForm.formState.errors.firstName.message!)}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>{t('input.middlename.label')}</FieldLabel>
          <Input
            {...features.profileForm.register('middleName')}
            placeholder={t('input.middlename.placeholder')}
            aria-invalid={!!features.profileForm.formState.errors.middleName}
          />
          {features.profileForm.formState.errors.middleName?.message && (
            <FieldError>{t(features.profileForm.formState.errors.middleName.message!)}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>{t('input.city.label')}</FieldLabel>
          <Input
            {...features.profileForm.register('city')}
            placeholder={t('input.city.placeholder')}
            aria-invalid={!!features.profileForm.formState.errors.city}
          />
          {features.profileForm.formState.errors.city?.message && (
            <FieldError>{t(features.profileForm.formState.errors.city.message!)}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>{t('input.phone.label')}</FieldLabel>
          <Input value={state.user?.phone ?? ''} disabled />
        </Field>

        <Field>
          <FieldLabel>{t('input.email.label')}</FieldLabel>
          <Input
            type="email"
            {...features.profileForm.register('email')}
            placeholder={t('input.email.placeholder')}
            aria-invalid={!!features.profileForm.formState.errors.email}
          />
          {features.profileForm.formState.errors.email?.message && (
            <FieldError>{t(features.profileForm.formState.errors.email.message!)}</FieldError>
          )}
        </Field>
      </form>

      <div className="py-[16px] flex flex-col gap-[10px]">
        <Button
          form="profile-form"
          size="large"
          variant="secondary"
          className="w-full"
          type="submit"
        >
          {t('button.update-profile')}
        </Button>
        <Button size="large" className="w-full" onClick={functions.handleLogout} type="button">
          {t('button.logout')}
        </Button>
      </div>

      {!state.isDesktop && (
        <Drawer open={features.logoutDialog.opened} onOpenChange={features.logoutDialog.toggle}>
          <DrawerContent asChild>
            <div className="flex flex-col items-center p-[16px]">
              <CircleQuestionMarkIcon className="size-[80px] fill-neutral-900 stroke-background" />
              <DrawerTitle
                className={typographyVariants({
                  variant: 'title-md',
                  className: 'py-[12px] text-center',
                })}
              >
                {t('profile.logout-confirm')}
              </DrawerTitle>
              <DrawerClose asChild>
                <Button className="w-full" variant="secondary" size="large" type="button">
                  {t('button.cancel')}
                </Button>
              </DrawerClose>
              <Button
                className="w-full mt-[8px]"
                size="large"
                onClick={functions.handleConfirmLogout}
                type="button"
              >
                {t('button.logout')}
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  )
}
