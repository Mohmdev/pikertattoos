/* eslint-disable  */

import React from 'react'
import { ImageResponse } from 'next/og'
import { getCachedGlobal } from '@data/getGlobal'

import { getServerSideURL } from '@utils/getURL'

import type { Asset, GlobalSetting } from '@payload-types'

// Image metadata
export const size = {
  width: 32,
  height: 32
}
export const contentType = 'image/svg+xml'

// Image generation
export default async function Icon() {
  const fallbackIcon = '/assets/nextjs-favicon.svg'
  const alt = 'favicon'
  try {
    const graphics = (await getCachedGlobal('global-settings', 1)()) as GlobalSetting
    const favicon = graphics?.branding?.logoSquare as Asset

    // Ensure we have a valid URL, defaulting to local asset if needed
    const imageUrl = favicon?.url
      ? `${getServerSideURL() || ''}${favicon.url}`
      : new URL(fallbackIcon, getServerSideURL()).toString()

    return new ImageResponse(
      <img src={imageUrl} alt={alt} width={size.width} height={size.height} />,
      { ...size }
    )
  } catch (error) {
    // Log error for monitoring but don't expose details
    console.error('Favicon generation error:', error)
    return new ImageResponse(
      <img src={fallbackIcon} alt={alt} width={size.width} height={size.height} />,
      { ...size }
    )
  }
}
