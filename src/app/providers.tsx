'use client'

import { QueryProviders } from '@/components/providers/queryProvider'
import { ShadcnThemeProvider } from '@/components/providers/themeProvider'

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProviders>
      <ShadcnThemeProvider
        attribute="class"
        defaultTheme='light'
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ShadcnThemeProvider>
    </QueryProviders>
  )
}