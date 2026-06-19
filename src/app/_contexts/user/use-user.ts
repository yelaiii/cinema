import { use } from 'react'

import { UserContext } from './user-context'

export function useUser() {
  return use(UserContext)
}
