'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@utils/cn'

import { Dialog, DialogContent, DialogOverlay } from '@ui/dialog'

type Props = {
  children: React.ReactNode
}

export const DocModalProvider = ({ children }: Props) => {
  const router = useRouter()
  const [open, setOpen] = useState(true)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open) {
      // Delay the navigation to allow the exit animation to play
      setTimeout(() => {
        router.back()
      }, 300) // Match this with your animation duration
    }
  }

  return (
    <Dialog modal={true} open={open} onOpenChange={handleOpenChange}>
      <DialogOverlay />
      <DialogContent
        className={cn(
          'overflow-hidden p-0',
          'aspect-[3/4] max-h-[85vh]',
          'w-full max-w-[min(85vw,600px)]',
          'rounded-lg border-0 border-border',
          'bg-background/70 backdrop-blur-xl',
          'shadow-lg shadow-black/70'
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}
