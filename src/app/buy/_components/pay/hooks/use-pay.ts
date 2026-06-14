import { useField, useMutation } from '@siberiacancode/reactuse'
import { parseAsJson, parseAsStringLiteral, useQueryState } from 'nuqs'

import { postCinemaPayment } from '@/api'
import { BuyTicketsStep } from '@/app/buy/_types'

import type { HallSeat } from '../../pick-seats'

export function usePay() {
  const [_step, setStep] = useQueryState(
    'step',
    parseAsStringLiteral(Object.values(BuyTicketsStep)).withDefault(BuyTicketsStep['Pick-seats']),
  )

  const [filmId] = useQueryState('filmId')
  const [date] = useQueryState('date')
  const [time] = useQueryState('time')
  const [seats] = useQueryState(
    'seats',
    parseAsJson((val) => val as HallSeat[]),
  )

  const [lastName] = useQueryState('lastName')
  const [firstName] = useQueryState('firstName')
  const [middleName] = useQueryState('middleName')
  const [phone] = useQueryState('phone')
  const [_ticketIds, setTicketIds] = useQueryState(
    'ticketIds',
    parseAsJson((val) => val as string[]),
  )

  const panField = useField('', { validateOnChange: true })
  const expireDateField = useField('', { validateOnChange: true })
  const cvvField = useField('', { validateOnChange: true })

  const paymentMutation = useMutation(postCinemaPayment)

  const handleBack = async () => {
    await setStep(BuyTicketsStep.Contacts)
  }

  const handleNext = async () => {
    panField.clearError()
    expireDateField.clearError()
    cvvField.clearError()

    if (!filmId || !date || !time || !seats || !firstName || !lastName || !middleName || !phone)
      return

    const paymentResponse = await paymentMutation.mutateAsync({
      body: {
        filmId,
        person: {
          firstname: firstName,
          lastname: lastName,
          middlename: middleName,
          phone: phone,
        },
        debitCard: {
          pan: panField.getValue().replaceAll(' ', ''),
          expireDate: expireDateField.getValue().replaceAll(' ', ''),
          cvv: cvvField.getValue().replaceAll(' ', ''),
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
      await setTicketIds(ids)
      await setStep(BuyTicketsStep.Payed)
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
