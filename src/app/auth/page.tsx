'use client'

import type { ComponentType, JSX } from 'react'

import dynamic from 'next/dynamic'
import { parseAsStringEnum, useQueryState } from 'nuqs'

import { OtpStepSkeleton } from './_components/otp-step/components/otp-step-skeleton'
import { PhoneStep } from './_components/phone-step'
import { AuthFlowUrlParams, AuthFlowStep } from './_constants'

const STEPS: Record<AuthFlowStep, (() => JSX.Element) | ComponentType> = {
  [AuthFlowStep.PHONE]: PhoneStep,
  [AuthFlowStep.OTP]: dynamic(() => import('./_components/otp-step'), {
    ssr: false,
    loading: OtpStepSkeleton,
  }),
}

export default function AuthPage() {
  const [step] = useQueryState(
    AuthFlowUrlParams.STEP,
    parseAsStringEnum<AuthFlowStep>(Object.values(AuthFlowStep)).withDefault(AuthFlowStep.PHONE),
  )

  const Component = STEPS[step]

  return <Component />
}
