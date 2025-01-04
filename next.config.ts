import type { NextConfig } from 'next'

import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.cjs'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: false
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  redirects,
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year,
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', '') as 'http' | 'https'
        }
      }),
      {
        hostname: 'res.cloudinary.com',
        protocol: 'https',
        pathname: '/mohmdevcloud/**'
      }
    ]
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api', 'import'] // https://github.com/vercel/next.js/issues/71638
  }
}

export default withPayload(nextConfig)
