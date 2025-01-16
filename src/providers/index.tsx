import React from 'react'

// import { Toaster } from 'sonner'

import { NextThemeProvider } from './NextTheme'

// import { ReactQueryProvider } from './ReactQuery'

// import { HeaderThemeProvider } from './HeaderTheme'
// import { ScrollbarProvider } from './Scrollbar'
// import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      // disableTransitionOnChange
    >
      {/* <ReactQueryProvider> */}
      {/* <ScrollbarProvider> */}
      {children}
      {/* </ScrollbarProvider> */}
      {/* <Toaster /> */}
      {/* </ReactQueryProvider> */}
    </NextThemeProvider>
  )
}
