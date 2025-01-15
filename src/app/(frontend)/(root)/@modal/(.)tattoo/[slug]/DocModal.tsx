import React from 'react'
import { useRouter } from 'next/navigation'

import type { Tattoo } from '@payload-types'

import { MorphingDocModal } from '@components/motion/MorphingDialog/MorphingDocModal'

type Props = {
  doc: Partial<Tattoo>
}

const DocModal = ({ doc }: Props) => {
  const router = useRouter()
  // const handleOpenChange = () => {
  //   router.back()
  // }

  return <MorphingDocModal doc={doc} router={router} />
}

export default DocModal
