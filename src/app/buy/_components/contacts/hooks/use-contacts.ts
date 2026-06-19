import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { useUser } from '@/app/_contexts/user'
import { BuyFlowUrlParams, BuyFlowStep } from '@/app/buy/_constants'

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
  const router = useRouter()
  const searchParams = useSearchParams()

  const { user } = useUser()

  const contactsForm = useForm<ContactsFormValues>({
    resolver: zodResolver(contactsSchema),
    mode: 'all',
    values: {
      lastName: searchParams.get(BuyFlowUrlParams.LAST_NAME) || user?.lastname || '',
      firstName: searchParams.get(BuyFlowUrlParams.FIRST_NAME) || user?.firstname || '',
      middleName: searchParams.get(BuyFlowUrlParams.MIDDLE_NAME) || user?.middlename || '',
      city: searchParams.get(BuyFlowUrlParams.CITY) || user?.city || '',
      phone: searchParams.get(BuyFlowUrlParams.PHONE) || user?.phone || '',
      email: searchParams.get(BuyFlowUrlParams.EMAIL) || user?.email || '',
    },
  })

  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(BuyFlowUrlParams.STEP, BuyFlowStep.REVIEW_TICKETS)
    router.push(`?${params.toString()}`)
  }

  const handleNext = contactsForm.handleSubmit((values: ContactsFormValues) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(BuyFlowUrlParams.LAST_NAME, values.lastName.trim())
    params.set(BuyFlowUrlParams.FIRST_NAME, values.firstName.trim())
    params.set(BuyFlowUrlParams.MIDDLE_NAME, values.middleName.trim())
    params.set(BuyFlowUrlParams.CITY, values.city.trim())
    params.set(BuyFlowUrlParams.PHONE, values.phone.trim())
    params.set(BuyFlowUrlParams.EMAIL, values.email.trim())
    params.set(BuyFlowUrlParams.STEP, BuyFlowStep.PAY)
    router.push(`?${params.toString()}`)
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
