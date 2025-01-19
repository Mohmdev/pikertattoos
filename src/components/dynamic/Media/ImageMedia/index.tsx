'use client'

import React, { useEffect, useState } from 'react'
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
    onLoad: onLoadFromProps,
    objectFit = 'cover'
  } = props

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Calculate image properties
  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const { url, alt: altFromResource, height: fullHeight, width: fullWidth } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''

    const isAbsoluteUrl = (url: string) => url.startsWith('http://') || url.startsWith('https://')
    const validatedUrl = url ? (isAbsoluteUrl(url) ? url : `${getClientSideURL()}${url}`) : ''
    const cacheTag = resource.updatedAt
    src = cacheTag ? `${validatedUrl}?${cacheTag}` : validatedUrl
  }

  // Calculate sizes
  const sizes =
    sizeFromProps ||
    Object.entries(breakpoints)
      .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
      .join(', ')

  const loading = loadingFromProps || (!priority ? 'lazy' : undefined)

  useEffect(() => {
    if (!src) return
    const img = new Image()
    img.src = typeof src === 'string' ? src : src.src
    if (img.complete) setIsLoading(false)
  }, [src])

  const handleLoad = () => {
    setIsLoading(false)
    onLoadFromProps?.()
  }

  const handleError = () => {
    setError(true)
    setIsLoading(false)
  }

  if (!src || error) return null

  return (
    <picture>
      <NextImage
        alt={alt || ''}
        fill={fill}
        height={!fill ? height : undefined}
        priority={priority}
        quality={100}
        loading={loading}
        sizes={sizes}
        src={src}
        width={!fill ? width : undefined}
        className={cn(
          imgClassName,
          'transition-opacity duration-300 ease-in-out',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        style={fill ? { objectFit } : undefined}
        onLoad={handleLoad}
        onError={handleError}
      />
    </picture>
  )
}
