export const AuthFlowStep = {
  PHONE: 'phone',
  OTP: 'otp',
}
export type AuthFlowStep = (typeof AuthFlowStep)[keyof typeof AuthFlowStep]

export const AuthFlowUrlParams = {
  STEP: 'step',
  PHONE: 'phone',
  RETRY_DELAY: 'retryDelay',
  LAST_RETRY_AT: 'lastRetryAt',
} as const
