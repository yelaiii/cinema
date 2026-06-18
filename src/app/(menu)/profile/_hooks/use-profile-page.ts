'use client'

import type { SubmitEventHandler } from 'react'

import { useDisclosure, useField, useMediaQuery, useMutation } from '@siberiacancode/reactuse'

import { patchUsersProfile } from '@/api'
import { userContext } from '@/app/_contexts/user-context'

import { logoutAction } from '../_actions/logout'

export function useProfilePage() {
  const logoutDialog = useDisclosure()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const user = userContext.useSelect((value) => value)!

  const lastNameField = useField(user?.lastname ?? '')
  const firstNameField = useField(user?.firstname ?? '')
  const middleNameField = useField(user?.middlename ?? '')
  const cityField = useField(user?.city ?? '')
  const emailField = useField(user?.email ?? '', { validateOnChange: true })

  const updateProfileMutation = useMutation(patchUsersProfile)

  const handleLogout = () => {
    logoutDialog.open()
  }

  const handleConfirmLogout = async () => {
    await logoutAction()
    window.location.href = '/'
  }

  const handleUpdateProfile: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    updateProfileMutation.mutate({
      body: {
        phone: user.phone,
        profile: {
          firstname: firstNameField.getValue(),
          lastname: lastNameField.getValue(),
          middlename: middleNameField.getValue(),
          city: cityField.getValue(),
          email: emailField.getValue(),
        },
      },
    })
  }

  return {
    state: {
      isDesktop,
      user,
    },
    functions: {
      handleLogout,
      handleConfirmLogout,
      handleUpdateProfile,
    },
    features: {
      logoutDialog,
      lastNameField,
      firstNameField,
      middleNameField,
      cityField,
      emailField,
    },
  }
}
