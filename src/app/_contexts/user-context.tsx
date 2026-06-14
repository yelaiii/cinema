'use client'

import type { ReactNode } from 'react'

import { createContext } from '@siberiacancode/reactuse'

import type { User } from '@/api'

export const userContext = createContext<User | null>(null)

// need custom wrapper for nextjs
export function UserProvider({ children, user }: { children: ReactNode; user: User | undefined }) {
  return <userContext.Provider initialValue={user}>{children}</userContext.Provider>
}
