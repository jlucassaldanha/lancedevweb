'use client'

import { QueryProviders } from '@/components/providers/queryProvider'
import { ShadcnThemeProvider } from '@/components/providers/themeProvider'
import { AuthProvider } from '@/contexts/authContext'
import { User } from '@/types/user'

export default function AppProvider({ children, user, token }: { children: React.ReactNode, user: User | null, token: string | undefined }) {
  return (
    <QueryProviders>
      <ShadcnThemeProvider
        attribute="class"
        defaultTheme='light'
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider user={user} token={token}>
          {children}
        </AuthProvider>
      </ShadcnThemeProvider>
    </QueryProviders>
  )
}