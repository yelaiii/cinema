import { useField } from '@siberiacancode/reactuse'
import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { useEffect } from 'react'

import { userContext } from '@/app/_contexts/user-context'
import { BuyTicketsStep } from '@/app/buy/_types'

export function useContacts() {
  const user = userContext.useSelect((value) => value)
  const [_step, setStep] = useQueryState(
    'step',
    parseAsStringLiteral(Object.values(BuyTicketsStep)).withDefault(BuyTicketsStep['Pick-seats']),
  )

  const [lastName, setLastName] = useQueryState('lastName', { defaultValue: '' })
  const [firstName, setFirstName] = useQueryState('firstName', { defaultValue: '' })
  const [middleName, setMiddleName] = useQueryState('middleName', { defaultValue: '' })
  const [city, setCity] = useQueryState('city', { defaultValue: '' })
  const [phone, setPhone] = useQueryState('phone', { defaultValue: '' })
  const [email, setEmail] = useQueryState('email', { defaultValue: '' })

  const lastNameField = useField(lastName || user?.lastname || '')
  const firstNameField = useField(firstName || user?.firstname || '')
  const middleNameField = useField(middleName || user?.middlename || '')
  const cityField = useField(city || user?.city || '')
  const phoneField = useField(phone || user?.phone || '', { validateOnChange: true })
  const emailField = useField(email || user?.email || '', { validateOnChange: true })

  useEffect(() => {
    if (!lastName && user?.lastname) lastNameField.setValue(user.lastname)
    if (!firstName && user?.firstname) firstNameField.setValue(user.firstname)
    if (!middleName && user?.middlename) middleNameField.setValue(user.middlename)
    if (!city && user?.city) cityField.setValue(user.city)
    if (!phone && user?.phone) phoneField.setValue(user.phone)
    if (!email && user?.email) emailField.setValue(user.email)
  }, [])

  const handleBack = async () => {
    await setStep(BuyTicketsStep['Review-tickets'])
  }

  const handleNext = async () => {
    await Promise.all([
      setLastName(lastNameField.getValue()),
      setFirstName(firstNameField.getValue()),
      setMiddleName(middleNameField.getValue()),
      setCity(cityField.getValue()),
      setPhone(phoneField.getValue()),
      setEmail(emailField.getValue()),
    ])
    await setStep(BuyTicketsStep.Pay)
  }

  return {
    state: {
      user,
    },
    functions: {
      handleBack,
      handleNext,
    },
    features: {
      lastNameField,
      firstNameField,
      middleNameField,
      cityField,
      phoneField,
      emailField,
    },
  }
}
