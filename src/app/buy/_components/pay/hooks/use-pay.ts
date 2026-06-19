import { useField, useMutation } from '@siberiacancode/reactuse'
import { useRouter, useSearchParams } from 'next/navigation'

import { postCinemaPayment } from '@/api'
import { BUY_URL_PARAMS, BuyTicketsStep } from '@/app/buy/_constants'

export function usePay() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const panField = useField('', { validateOnChange: true })
  const expireDateField = useField('', { validateOnChange: true })
  const cvvField = useField('', { validateOnChange: true })

  const paymentMutation = useMutation(postCinemaPayment)

  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(BUY_URL_PARAMS.STEP, BuyTicketsStep.Contacts)
    router.push(`?${params.toString()}`)
  }

  const handleNext = async () => {
    panField.clearError()
    expireDateField.clearError()
    cvvField.clearError()

    const filmId = searchParams.get(BUY_URL_PARAMS.FILM_ID)
    const date = searchParams.get(BUY_URL_PARAMS.DATE)
    const time = searchParams.get(BUY_URL_PARAMS.TIME)

    const seatsStr = searchParams.get(BUY_URL_PARAMS.SEATS)
    const seats = seatsStr ? (JSON.parse(seatsStr) as { row: number; column: number }[]) : undefined

    const firstName = searchParams.get(BUY_URL_PARAMS.FIRST_NAME)
    const lastName = searchParams.get(BUY_URL_PARAMS.LAST_NAME)
    const middleName = searchParams.get(BUY_URL_PARAMS.MIDDLE_NAME)
    const phone = searchParams.get(BUY_URL_PARAMS.PHONE)

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
          pan: panField.getValue().trim(),
          expireDate: expireDateField.getValue().trim(),
          cvv: cvvField.getValue().trim(),
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
      params.set(BUY_URL_PARAMS.TICKETS, JSON.stringify(ids))
      params.set(BUY_URL_PARAMS.STEP, BuyTicketsStep.Payed)
      router.push(`?${params.toString()}`)
    }
  }

  return {
    functions: {
      handleBack,
      handleNext,
    },
    mutations: {
      payment: paymentMutation,
    },
    features: {
      panField,
      expireDateField,
      cvvField,
    },
  }
}
