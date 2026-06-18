import { useField, useMutation, useUrlSearchParams } from '@siberiacancode/reactuse'

import type { BuyTicketSearchParams } from '@/app/buy/_types'

import { postCinemaPayment } from '@/api'
import { BuyTicketsStep } from '@/app/buy/_types'

const payDefaultValue: BuyTicketSearchParams = {
  filmId: '',
  date: '',
  time: '',
  seats: [],
  firstName: '',
  lastName: '',
  middleName: '',
  phone: '',
}

export function usePay() {
  const urlSearchParams = useUrlSearchParams<BuyTicketSearchParams>({
    initialValue: payDefaultValue,
  })

  const panField = useField('', { validateOnChange: true })
  const expireDateField = useField('', { validateOnChange: true })
  const cvvField = useField('', { validateOnChange: true })

  const paymentMutation = useMutation(postCinemaPayment)

  const handleBack = () => {
    urlSearchParams.set({ step: BuyTicketsStep.Contacts })
  }

  const handleNext = async () => {
    panField.clearError()
    expireDateField.clearError()
    cvvField.clearError()

    const { filmId, date, time, seats, firstName, lastName, middleName, phone } =
      urlSearchParams.value

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
      urlSearchParams.set({
        ticketIds: ids,
        step: BuyTicketsStep.Payed,
      })
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
