import { useField, useMutation, useTimer } from '@siberiacancode/reactuse'
import { useRouter, useSearchParams } from 'next/navigation'
import { parseAsFloat, useQueryState } from 'nuqs'

import { postAuthOtp, postUsersSignin } from '@/api'
import { useUser } from '@/app/_contexts/user'
import { AuthFlowStep, AuthFlowUrlParams } from '@/app/auth/_constants'

import { setTokenAction } from '../actions/sign-in'

export function useOtpStep() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [, setStep] = useQueryState(AuthFlowUrlParams.STEP)
  const [retryDelay, setRetryDelay] = useQueryState(AuthFlowUrlParams.RETRY_DELAY, parseAsFloat)
  const [lastRetryAt, setLastRetryAt] = useQueryState(AuthFlowUrlParams.LAST_RETRY_AT, parseAsFloat)

  const { setUser } = useUser()

  const otpField = useField('', { validateOnChange: true })

  const signInMutation = useMutation(postUsersSignin)
  const createOtpMutation = useMutation(postAuthOtp)

  const initialTimerSeconds = (() => {
    if (!lastRetryAt || !retryDelay) return 0

    const remainingMs = lastRetryAt + retryDelay - Date.now()
    return remainingMs > 0 ? Math.ceil(remainingMs / 1000) : 0
  })()

  const timer = useTimer(initialTimerSeconds, {
    immediately: true,
  })

  const handleOtpSubmit = async () => {
    otpField.clearError()

    const signInResponse = await signInMutation
      .mutateAsync({
        body: {
          code: +otpField.getValue(),
          phone: searchParams.get('phone')!,
        },
      })
      .catch(() => null)

    if (!signInResponse?.data?.success) return otpField.setError('validation.invalid-otp')

    await setTokenAction(signInResponse.data.token)
    setUser(signInResponse.data.user)

    const redirect = searchParams.get('redirect')
    if (redirect) router.replace(redirect)
    else return router.replace('/')
  }

  const handleResend = async () => {
    try {
      const createOtpResponse = await createOtpMutation.mutateAsync({
        body: { phone: searchParams.get('phone')! },
      })

      await setRetryDelay(createOtpResponse.data.retryDelay)
      await setLastRetryAt(Date.now())

      const delay = Math.round((createOtpResponse.data.retryDelay || 0) / 1000)
      timer.restart(delay, true)
    } catch {}
  }

  const handleBack = async () => {
    await setStep(AuthFlowStep.PHONE)
  }

  return {
    mutations: {
      signIn: signInMutation,
      createOtp: createOtpMutation,
    },
    functions: {
      handleOtpSubmit,
      handleResend,
      handleBack,
    },
    features: {
      otpField,
      timer,
    },
  }
}
