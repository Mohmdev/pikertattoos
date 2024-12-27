'use client'

import { ScrollArea, ScrollBar } from '@ui/scroll-area'

type ScrollbarProviderProps = {
  children: React.ReactNode
}

export const ScrollbarProvider = ({ children }: ScrollbarProviderProps) => {
  return (
    <ScrollArea type="scroll" className="rounded-md border">
      {children}
      <ScrollBar
        orientation="vertical"
        className="z-[9999] transition-opacity duration-200 ease-linear"
      />
    </ScrollArea>
  )
}
