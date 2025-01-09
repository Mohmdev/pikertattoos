/* eslint-disable  */

import fs from 'fs'
import path from 'path'
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
export const contentType = 'image/png'

// Image generation
export default async function Icon() {
  const alt = 'favicon'

  try {
    // Try to get dynamic favicon from CMS
    const graphics = (await getCachedGlobal('global-settings', 1)()) as GlobalSetting
    const favicon = graphics?.branding?.logoSquare as Asset

    if (favicon?.url) {
      // Use dynamic favicon from CMS
      const imageUrl = `${getServerSideURL()}${favicon.url}`
      return new ImageResponse(
        <img src={imageUrl} alt={alt} width={size.width} height={size.height} />,
        { ...size }
      )
    }

    // Fallback to static favicon
    const staticIconPath = path.join(process.cwd(), 'public', 'assets', 'next-logo.png')
    const staticIconBuffer = await fs.promises.readFile(staticIconPath)
    const staticIconBase64 = `data:image/png;base64,${staticIconBuffer.toString('base64')}`

    return new ImageResponse(
      <img src={staticIconBase64} alt={alt} width={size.width} height={size.height} />,
      { ...size }
    )
  } catch (error) {
    console.error('Favicon generation error:', error)

    // Emergency fallback using inline SVG
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            backgroundColor: '#000',
            color: '#fff'
          }}
        >
          X
        </div>
      ),
      { ...size }
    )
  }
}
