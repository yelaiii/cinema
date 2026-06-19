import { zodResolver } from '@hookform/resolvers/zod'
import { useUrlSearchParams } from '@siberiacancode/reactuse'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { useUser } from '@/app/_contexts/user'
import { BUY_URL_PARAMS, BuyTicketsStep } from '@/app/buy/_constants'

export const contactsSchema = z.object({
  lastName: z.string().trim().min(1, 'Поле обязательно для заполнения'),
  firstName: z.string().trim().min(1, 'Поле обязательно для заполнения'),
  middleName: z.string().trim().min(1, 'Поле обязательно для заполнения'),
  city: z.string().trim().min(1, 'Поле обязательно для заполнения'),
  phone: z.e164('Неверный номер телефона'),
  email: z.email('Некорректный email').trim().min(1, 'Поле обязательно для заполнения'),
})

export type ContactsFormValues = z.infer<typeof contactsSchema>

export function useContacts() {
  const { user } = useUser()

  const searchParams = useUrlSearchParams<Record<string, string>>({
    write: 'push',
  })

  const contactsForm = useForm<ContactsFormValues>({
    resolver: zodResolver(contactsSchema),
    mode: 'all',
    values: {
      lastName: searchParams.value?.[BUY_URL_PARAMS.LAST_NAME] || user?.lastname || '',
      firstName: searchParams.value?.[BUY_URL_PARAMS.FIRST_NAME] || user?.firstname || '',
      middleName: searchParams.value?.[BUY_URL_PARAMS.MIDDLE_NAME] || user?.middlename || '',
      city: searchParams.value?.[BUY_URL_PARAMS.CITY] || user?.city || '',
      phone: searchParams.value?.[BUY_URL_PARAMS.PHONE] || user?.phone || '',
      email: searchParams.value?.[BUY_URL_PARAMS.EMAIL] || user?.email || '',
    },
  })

  const handleBack = () => {
    searchParams.set({ [BUY_URL_PARAMS.STEP]: BuyTicketsStep.ReviewTickets })
  }

  const handleNext = contactsForm.handleSubmit((values: ContactsFormValues) => {
    searchParams.set({
      [BUY_URL_PARAMS.LAST_NAME]: values.lastName.trim(),
      [BUY_URL_PARAMS.FIRST_NAME]: values.firstName.trim(),
      [BUY_URL_PARAMS.MIDDLE_NAME]: values.middleName.trim(),
      [BUY_URL_PARAMS.CITY]: values.city.trim(),
      [BUY_URL_PARAMS.PHONE]: values.phone.trim(),
      [BUY_URL_PARAMS.EMAIL]: values.email.trim(),
      [BUY_URL_PARAMS.STEP]: BuyTicketsStep.Pay,
    })
  })

  return {
    state: {
      user,
    },
    functions: {
      handleBack,
      handleNext,
    },
    features: {
      contactsForm,
    },
  }
}
