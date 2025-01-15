'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

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
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay>
        <DialogContent className="overflow-y-hidden">{children}</DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
