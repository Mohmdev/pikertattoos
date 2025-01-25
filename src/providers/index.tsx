import React from 'react'

import type { Theme } from './Theme/types'

import { HeaderThemeProvider } from './HeaderTheme'
import { ReactQueryProvider } from './ReactQuery'
// import { Toaster } from 'sonner'

import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
  defaultTheme?: Theme
}> = ({ children, defaultTheme = 'dark' }) => {
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <HeaderThemeProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        {/* <Toaster /> */}
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
