import { useField, useMount, useUrlSearchParams } from '@siberiacancode/reactuse'

import type { BuyTicketSearchParams } from '@/app/buy/_types'

import { userContext } from '@/app/_contexts/user-context'
import { BuyTicketsStep } from '@/app/buy/_types'

const contactsDefaultValue: BuyTicketSearchParams = {
  lastName: '',
  firstName: '',
  middleName: '',
  city: '',
  phone: '',
  email: '',
}

export function useContacts() {
  const urlSearchParams = useUrlSearchParams<BuyTicketSearchParams>({
    initialValue: contactsDefaultValue,
  })
  const user = userContext.useSelect((value) => value)

  const lastNameField = useField(urlSearchParams.value.lastName || user?.lastname || '')
  const firstNameField = useField(urlSearchParams.value.firstName || user?.firstname || '')
  const middleNameField = useField(urlSearchParams.value.middleName || user?.middlename || '')
  const cityField = useField(urlSearchParams.value.city || user?.city || '')
  const phoneField = useField(urlSearchParams.value.phone || user?.phone || '', {
    validateOnChange: true,
  })
  const emailField = useField(urlSearchParams.value.email || user?.email || '', {
    validateOnChange: true,
  })

  useMount(() => {
    if (!urlSearchParams.value.lastName && user?.lastname) lastNameField.setValue(user.lastname)
    if (!urlSearchParams.value.firstName && user?.firstname) firstNameField.setValue(user.firstname)
    if (!urlSearchParams.value.middleName && user?.middlename)
      middleNameField.setValue(user.middlename)
    if (!urlSearchParams.value.city && user?.city) cityField.setValue(user.city)
    if (!urlSearchParams.value.phone && user?.phone) phoneField.setValue(user.phone)
    if (!urlSearchParams.value.email && user?.email) emailField.setValue(user.email)
  })

  const handleBack = () => {
    urlSearchParams.set({ step: BuyTicketsStep.ReviewTickets })
  }

  const handleNext = () => {
    urlSearchParams.set({
      lastName: lastNameField.getValue(),
      firstName: firstNameField.getValue(),
      middleName: middleNameField.getValue(),
      city: cityField.getValue(),
      phone: phoneField.getValue(),
      email: emailField.getValue(),
      step: BuyTicketsStep.Pay,
    })
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
