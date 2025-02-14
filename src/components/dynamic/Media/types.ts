import type { StaticImageData } from 'next/image'
import type { ElementType, Ref } from 'react'

import type { Media as MediaType } from '@payload-types'

export interface Props {
  alt?: string
  className?: string
  fill?: boolean // for NextImage only
  htmlElement?: ElementType | null
  imgClassName?: string
  onClick?: () => void
  onLoad?: () => void
  loading?: 'lazy' | 'eager' // for NextImage only
  priority?: boolean // for NextImage only
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>
  resource?: MediaType | number // for Payload media
  sizes?: string // for NextImage only
  src?: StaticImageData // for static media
  videoClassName?: string
  //
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  controls?: boolean
}
