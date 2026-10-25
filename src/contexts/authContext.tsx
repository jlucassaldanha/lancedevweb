'use client'

import { User } from '@/types/user'
import { createContext, useContext } from 'react'

interface UserAuthContextType {
  user: User | null
  token: string | undefined
}

const AuthContext = createContext<UserAuthContextType | undefined>(undefined)

export function AuthProvider({ children, user, token }: { children: React.ReactNode, user: User | null, token: string | undefined}) {
  return (
    <AuthContext.Provider value={{ user, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("userAuth deve ser usado dentro de AuthProvider")
  }

  return context
}