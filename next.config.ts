import type { NextConfig } from 'next'

import redirects from './redirects.mjs'

// const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
//   ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
//   : undefined || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: false
  },
  redirects,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ucarecdn.com'
      }
      // ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
      //   const url = new URL(item)

      //   return {
      //     hostname: url.hostname,
      //     protocol: url.protocol.replace(':', '')
      //   }
      // })
    ]
  }
}

export default nextConfig
