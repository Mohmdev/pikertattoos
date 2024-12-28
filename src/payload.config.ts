import path from 'path'
import { fileURLToPath } from 'url'

import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { buildConfig } from 'payload'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor(),
  collections: [],
  secret: process.env.PAYLOAD_SECRET || '',
  db: vercelPostgresAdapter({ forceUseVercelPostgres: true }),
  plugins: [
    vercelBlobStorage({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // Specify which collections should use Vercel Blob
      collections: {
        // media: {
        //   prefix: 'media',
        //   disableLocalStorage: true
        // },
        // assets: {
        //   prefix: 'assets',
        //   disableLocalStorage: true
        // }
      }
    })
  ],
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  }
})
