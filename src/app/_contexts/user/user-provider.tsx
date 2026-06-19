'use client'

import type { ReactNode } from 'react'

import { useState } from 'react'

import type { User } from '@/api'

import { UserContext } from './user-context'

export function UserProvider({
  children,
  defaultUser,
}: {
  children: ReactNode
  defaultUser: User | null
}) {
  const [user, setUser] = useState<User | null>(defaultUser)

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
