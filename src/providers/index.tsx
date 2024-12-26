import React from 'react'

import { Toaster } from 'sonner'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        {children}
        <Toaster />
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
