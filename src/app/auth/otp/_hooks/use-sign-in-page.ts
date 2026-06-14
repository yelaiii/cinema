import { useField, useMutation, useTimer } from '@siberiacancode/reactuse'
import { useRouter, useSearchParams } from 'next/navigation'

import { postAuthOtp, postUsersSignin } from '@/api'

import { signInAction } from '../_actions/sign-in'

export function useOtpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const otpField = useField('', { validateOnChange: true })

  const signInMutation = useMutation(postUsersSignin)
  const resendOtpMutation = useMutation(postAuthOtp)

  const timer = useTimer(Math.round((resendOtpMutation.data?.data.retryDelay || 0) / 1000))

  const handleSubmit = async () => {
    otpField.clearError()

    const mutation = await signInMutation
      .mutateAsync({
        body: {
          code: +otpField.getValue(),
          phone: searchParams.get('phone')!,
        },
      })
      .catch(() => null)

    if (!mutation?.data?.success) return otpField.setError('Неверный код')

    await signInAction(mutation.data.token)
    const url = new URL('/', window.location.origin)
    if (searchParams.get('redirect')) {
      url.pathname = `/${searchParams.get('redirect')}`
    }
    return router.replace(url.toString())
  }

  const handleResend = () => {
    resendOtpMutation
      .mutateAsync({
        body: {
          phone: searchParams.get('phone')!,
        },
      })
      .catch(() => null)
  }

  return {
    state: {
      searchParams,
    },
    mutations: {
      signIn: signInMutation,
      resendOtp: resendOtpMutation,
    },
    functions: {
      handleSubmit,
      handleResend,
    },
    features: {
      otpField,
      timer,
    },
  }
}
