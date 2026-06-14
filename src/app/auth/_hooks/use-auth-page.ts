import { useField, useMutation } from '@siberiacancode/reactuse'
import { useRouter, useSearchParams } from 'next/navigation'

import { postAuthOtp } from '@/api'

export function useAuthPage() {
  const router = useRouter()

  const searchParams = useSearchParams()
  const phoneField = useField(searchParams.get('phone') || '', { validateOnChange: true })

  const createOtpMutation = useMutation(postAuthOtp)

  const handleSubmit = async () => {
    phoneField.clearError()

    try {
      await createOtpMutation.mutateAsync({
        body: {
          phone: phoneField.getValue(),
        },
      })

      const url = new URL('/auth/otp', window.location.origin)
      url.searchParams.set('phone', phoneField.getValue())
      if (searchParams.get('redirect')) {
        url.searchParams.set('redirect', searchParams.get('redirect')!)
      }

      router.push(url.toString())
    } catch {}
  }

  return {
    mutations: {
      createOtp: createOtpMutation,
    },
    functions: {
      handleSubmit,
    },
    features: {
      phoneField,
    },
  }
}
