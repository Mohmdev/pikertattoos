import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import type { Plugin } from 'payload'

export const storagePlugin: Plugin = vercelBlobStorage({
  token: process.env.BLOB_READ_WRITE_TOKEN,
  collections: {
    media: {
      prefix: 'media',
      disableLocalStorage: true
    },
    assets: {
      prefix: 'assets',
      disableLocalStorage: true
    }
  }
})
