'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useDisclosure, useMediaQuery, useMutation } from '@siberiacancode/reactuse'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { patchUsersProfile } from '@/api'
import { useUser } from '@/app/_contexts/user'

import { logoutAction } from '../_actions/logout'

export const ProfileFormSchema = z.object({
  lastName: z.string().trim(),
  firstName: z.string().trim(),
  middleName: z.string().trim(),
  city: z.string().trim(),
  email: z.email('validation.invalid-email').trim().or(z.literal('')),
})
export type ProfileFormSchema = z.infer<typeof ProfileFormSchema>

export function useProfilePage() {
  const logoutDialog = useDisclosure()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const { user } = useUser()

  const profileForm = useForm<ProfileFormSchema>({
    resolver: zodResolver(ProfileFormSchema),
    mode: 'all',
    values: {
      lastName: user?.lastname ?? '',
      firstName: user?.firstname ?? '',
      middleName: user?.middlename ?? '',
      city: user?.city ?? '',
      email: user?.email ?? '',
    },
  })

  const updateProfileMutation = useMutation(patchUsersProfile)

  const handleLogout = () => {
    logoutDialog.open()
  }

  const handleConfirmLogout = async () => {
    await logoutAction()
  }

  const handleUpdateProfile = (values: ProfileFormSchema) => {
    updateProfileMutation.mutate({
      body: {
        phone: user!.phone,
        profile: {
          firstname: values.firstName.trim(),
          lastname: values.lastName.trim(),
          middlename: values.middleName.trim(),
          city: values.city.trim(),
          email: values.email.trim(),
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
      profileForm,
    },
  }
}
