'use client'

import React, { useState } from 'react'
import NextImage from 'next/image'
import type { StaticImageData } from 'next/image'

import { cssVariables } from 'src/cssVariables'
import { cn } from '@utils/cn'
import { getClientSideURL } from '@utils/getURL'

import type { Props as MediaProps } from '../types'

const { breakpoints } = cssVariables

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    imgClassName,
    priority,
    resource,
    sizes: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
    objectFit = 'cover'
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const { url, alt: altFromResource, height: fullHeight, width: fullWidth } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''

    // Check if the URL is already absolute
    const isAbsoluteUrl = (url: string) => url.startsWith('http://') || url.startsWith('https://')
    const validatedUrl = url ? (isAbsoluteUrl(url) ? url : `${getClientSideURL()}${url}`) : ''

    const cacheTag = resource.updatedAt
    src = `${validatedUrl}?${cacheTag}`
  }

  const loading = loadingFromProps || (!priority ? 'lazy' : undefined)
  const [isLoading, setIsLoading] = useState(true)

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
        .join(', ')

  return (
    <picture>
      <NextImage
        alt={alt || ''}
        fill={fill}
        height={!fill ? height : undefined}
        // placeholder="blur"
        priority={priority}
        quality={100}
        loading={loading}
        sizes={sizes}
        src={src}
        width={!fill ? width : undefined}
        className={cn(
          imgClassName,
          'transition-opacity duration-300 ease-in-out',
          isLoading
            ? 'opacity-0' // Start fully transparent
            : 'opacity-100' // Fade to fully visible
        )}
        style={fill ? { objectFit: objectFit } : undefined}
        onLoad={() => setIsLoading(false)}
      />
    </picture>
  )
}
