'use client'

import React, { useEffect, useRef, useState } from 'react'

import { cn } from '@utils/cn'
import { getClientSideURL } from '@utils/getURL'

import type { Props as MediaProps } from '../types'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName, controls = false } = props

  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const { current: video } = videoRef
    if (!video) return

    const handleError = () => {
      setError(true)
      setIsLoading(false)
    }

    const handleLoadedData = () => {
      setIsLoading(false)
    }

    const handleSuspend = () => {
      // Optional: Handle suspension if needed
      // console.warn('Video playback suspended')
    }

    // Add event listeners
    video.addEventListener('error', handleError)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('suspend', handleSuspend)

    // Cleanup
    return () => {
      video.removeEventListener('error', handleError)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('suspend', handleSuspend)
    }
  }, [])

  if (
    !resource ||
    typeof resource !== 'object' ||
    !resource.filename ||
    error
  ) {
    return null
  }

  // Apply the same URL validation and cache tag logic as ImageMedia
  const isAbsoluteUrl = (url: string) =>
    url.startsWith('http://') || url.startsWith('https://')
  const validatedUrl = resource.url
    ? isAbsoluteUrl(resource.url)
      ? resource.url
      : `${getClientSideURL()}/media/${resource.filename}`
    : ''
  const cacheTag = resource.updatedAt
  const src = cacheTag ? `${validatedUrl}?${cacheTag}` : validatedUrl

  return (
    <div className={cn('relative', isLoading && 'animate-pulse')}>
      <video
        autoPlay
        className={cn(
          videoClassName,
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
        )}
        controls={controls}
        loop
        muted
        onClick={onClick}
        playsInline
        ref={videoRef}
      >
        <source src={src} type={resource.mimeType || 'video/mp4'} />
      </video>
    </div>
  )
}
