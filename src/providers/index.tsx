import React from 'react'

import type { Theme } from './Theme/types'

import { HeaderThemeProvider } from './HeaderTheme'
// import { Toaster } from 'sonner'

import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
  defaultTheme?: Theme
}> = ({ children, defaultTheme = 'dark' }) => {
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <HeaderThemeProvider>
        {children}
        {/* <Toaster /> */}
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
