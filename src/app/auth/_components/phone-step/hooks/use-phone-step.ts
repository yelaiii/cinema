import { useField, useMutation } from '@siberiacancode/reactuse'
import { parseAsFloat, useQueryState } from 'nuqs'

import { postAuthOtp } from '@/api'
import { AuthFlowUrlParams, AuthFlowStep } from '@/app/auth/_constants'

export function usePhoneStep() {
  const [phone, setPhone] = useQueryState(AuthFlowUrlParams.PHONE)
  const [, setStep] = useQueryState(AuthFlowUrlParams.STEP)
  const [, setLastRetryAt] = useQueryState(AuthFlowUrlParams.LAST_RETRY_AT, parseAsFloat)
  const [, setRetryDelay] = useQueryState(AuthFlowUrlParams.RETRY_DELAY, parseAsFloat)

  const phoneField = useField(phone || '', { validateOnChange: true })

  const createOtpMutation = useMutation(postAuthOtp)

  const handlePhoneSubmit = async () => {
    try {
      const createOtpResponse = await createOtpMutation.mutateAsync({
        body: { phone: phoneField.getValue() },
      })

      await setLastRetryAt(Date.now())
      await setRetryDelay(createOtpResponse.data.retryDelay)

      await setPhone(phoneField.getValue())
      await setStep(AuthFlowStep.OTP)
    } catch {}
  }

  return {
    mutations: {
      createOtp: createOtpMutation,
    },
    functions: {
      handlePhoneSubmit,
    },
    features: {
      phoneField,
    },
  }
}
