import React from 'react'

import { Toaster } from 'sonner'

import { HeaderThemeProvider } from './HeaderTheme'
import { ReactQueryProvider } from './ReactQuery'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster />
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
