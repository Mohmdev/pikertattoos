'use client'

import { cn } from '@utils/cn'
import { getClientSideURL } from '@utils/getURL'
import NextImage from 'next/image'
import type { StaticImageData } from 'next/image'
import React, { useEffect, useState } from 'react'
import { cssVariables } from 'src/cssVariables'
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
    objectFit = 'cover',
  } = props

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Calculate image properties
  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const {
      alt: altFromResource,
      height: fullHeight,
      url,
      width: fullWidth,
    } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''

    const cacheTag = resource.updatedAt

    src = `${getClientSideURL()}${url}?${cacheTag}`
  }

  // Calculate sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
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
        priority={priority}
        quality={100}
        loading={loading}
        src={src}
        onLoad={handleLoad}
        onError={handleError}
        sizes={sizes}
        height={!fill ? height : undefined}
        width={!fill ? width : undefined}
        style={fill ? { objectFit } : undefined}
        className={cn(
          imgClassName,
          'transition-opacity duration-300 ease-in-out',
          isLoading ? 'opacity-0' : 'opacity-100',
        )}
      />
    </picture>
  )
}
