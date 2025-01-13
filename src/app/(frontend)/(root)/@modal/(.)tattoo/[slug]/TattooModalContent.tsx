'use client'

import { useRouter } from 'next/navigation'

import type { Tattoo } from '@payload-types'

import { Dialog, DialogContent } from '@ui/dialog'

import { RenderDoc } from '../../../tattoo/RenderDoc'

export function TattooModalContent({ doc }: { doc: Partial<Tattoo> }) {
  const router = useRouter()

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent className="sm:max-w-[425px]">
        <RenderDoc doc={doc} className="max-h-[90vh] min-h-96 overflow-y-auto" />
      </DialogContent>
    </Dialog>
  )
}
