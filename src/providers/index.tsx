import React from 'react'

import { Toaster } from 'sonner'

import { ThemeProvider } from './NextTheme'
// import { HeaderThemeProvider } from './HeaderTheme'
import { ReactQueryProvider } from './ReactQuery'

// import { ScrollbarProvider } from './Scrollbar'
// import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ReactQueryProvider>
          {/* <ScrollbarProvider> */}
          {children}
          {/* </ScrollbarProvider> */}
          <Toaster />
        </ReactQueryProvider>
      </ThemeProvider>
    </>
  )
}
