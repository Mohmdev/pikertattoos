'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@utils/cn'

import { Dialog, DialogContent, DialogOverlay } from '@ui/dialog'

type Props = {
  children: React.ReactNode
}

export const DocModalProvider = ({ children }: Props) => {
  const router = useRouter()
  const handleOpenChange = () => {
    router.back()
  }

  return (
    <Dialog modal={true} defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay className="bg-background/25 backdrop-blur-sm">
        <DialogContent
          className={cn(
            //
            'overflow-hidden',
            'h-full max-h-[90vh] w-full max-w-[90vw]',
            'p-0'
          )}
        >
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
