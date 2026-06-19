import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@siberiacancode/reactuse'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { postCinemaPayment } from '@/api'
import { BuyFlowUrlParams, BuyFlowStep } from '@/app/buy/_constants'

export const PayFormSchema = z.object({
  pan: z
    .string()
    .trim()
    .regex(/^(?: *\d){16} *$/, 'Неверный формат карты'),
  expireDate: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Формат должен быть ММ/ГГ'),
  cvv: z
    .string()
    .trim()
    .regex(/^\d{3}$/, 'CVV должен состоять из 3 цифр'),
})
export type PayFormValues = z.infer<typeof PayFormSchema>

export function usePay() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const payForm = useForm<PayFormValues>({
    resolver: zodResolver(PayFormSchema),
    mode: 'all',
    defaultValues: {
      pan: '',
      expireDate: '',
      cvv: '',
    },
  })

  const paymentMutation = useMutation(postCinemaPayment)

  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(BuyFlowUrlParams.STEP, BuyFlowStep.CONTACTS)
    router.push(`?${params.toString()}`)
  }

  const handleNext = payForm.handleSubmit(async (values: PayFormValues) => {
    const filmId = searchParams.get(BuyFlowUrlParams.FILM_ID)
    const date = searchParams.get(BuyFlowUrlParams.DATE)
    const time = searchParams.get(BuyFlowUrlParams.TIME)
    const firstName = searchParams.get(BuyFlowUrlParams.FIRST_NAME)
    const lastName = searchParams.get(BuyFlowUrlParams.LAST_NAME)
    const middleName = searchParams.get(BuyFlowUrlParams.MIDDLE_NAME)
    const phone = searchParams.get(BuyFlowUrlParams.PHONE)
    const seats = JSON.parse(searchParams.get(BuyFlowUrlParams.SELECTED_SEATS)!) as {
      row: number
      column: number
    }[]

    if (!filmId || !date || !time || !seats || !firstName || !lastName || !middleName || !phone)
      return

    const paymentResponse = await paymentMutation.mutateAsync({
      body: {
        filmId,
        person: {
          firstname: firstName,
          lastname: lastName,
          middlename: middleName,
          phone,
        },
        debitCard: {
          pan: values.pan.trim(),
          expireDate: values.expireDate.trim(),
          cvv: values.cvv.trim(),
        },
        seance: {
          date,
          time,
        },
        tickets: seats,
      },
    })

    if (paymentResponse.data.order.status === 'PAYED') {
      const ids = paymentResponse.data.order.tickets.map((t) => t._id)
      const params = new URLSearchParams(searchParams.toString())
      params.set(BuyFlowUrlParams.TICKETS, JSON.stringify(ids))
      params.set(BuyFlowUrlParams.STEP, BuyFlowStep.SUCCESS)
      router.push(`?${params.toString()}`)
    }
  })

  return {
    functions: {
      handleBack,
      handleNext,
    },
    mutations: {
      payment: paymentMutation,
    },
    features: {
      payForm,
    },
  }
}
