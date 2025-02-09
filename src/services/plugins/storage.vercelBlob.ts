import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import type { Plugin } from 'payload'

export const vercelBlob: Plugin = vercelBlobStorage({
  token: process.env.BLOB_READ_WRITE_TOKEN,
  collections: {
    media: {
      prefix: 'piker_media',
      disableLocalStorage: true,
    },
    assets: {
      prefix: 'piker_assets',
      disableLocalStorage: true,
    },
    'user-photos': {
      prefix: 'piker_user-photos',
      disableLocalStorage: true,
    },
  },
  enabled: true,
})
