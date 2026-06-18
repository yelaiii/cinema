'use client'

import { CircleQuestionMarkIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from '@/components/ui/drawer'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Typography, typographyVariants } from '@/components/ui/typography'

import { useProfilePage } from './_hooks/use-profile-page'

export default function ProfilePage() {
  const { state, functions, features } = useProfilePage()

  return (
    <div>
      <div className="md:hidden h-[56px] flex items-center">
        <Typography tag="h1" variant="title-md">
          Профиль
        </Typography>
      </div>

      <form
        id="profile-form"
        className="py-[24px] flex flex-col gap-[16px]"
        onSubmit={functions.handleUpdateProfile}
      >
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
          <Input value={state.user!.phone} disabled />
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
      </form>

      <div className="py-[16px] flex flex-col gap-[10px]">
        <Button
          form="profile-form"
          size="large"
          variant="secondary"
          className="w-full"
          type="submit"
          disabled={!!features.emailField.error}
        >
          Обновить данные
        </Button>
        <Button size="large" className="w-full" onClick={functions.handleLogout} type="button">
          Выйти
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
                Вы уверены, что хотите выйти из профиля?
              </DrawerTitle>
              <DrawerClose asChild>
                <Button className="w-full" variant="secondary" size="large" type="button">
                  Отменить
                </Button>
              </DrawerClose>
              <Button
                className="w-full mt-[8px]"
                size="large"
                onClick={functions.handleConfirmLogout}
                type="button"
              >
                Выйти
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  )
}
