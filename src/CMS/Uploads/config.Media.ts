import path from 'path'
import { fileURLToPath } from 'url'

import { basicLexical } from '@services/editor/basicLexical'

import type { CollectionConfig } from 'payload'

import { anyone } from '@access/anyone'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig<'media'> = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media'
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    delete: isAdminOrSelf,
    update: isAdminOrSelf
  },
  defaultPopulate: {
    alt: true,
    filename: true,
    height: true,
    mimeType: true,
    url: true,
    width: true
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'mimeType', 'createdAt', 'updatedAt']
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
      admin: {
        description: 'Used for SEO and accessibility'
      }
    },
    {
      name: 'caption',
      type: 'richText',
      editor: basicLexical,
      admin: {
        description: 'Caption for this media file.'
      }
    }
  ],
  upload: {
    crop: true,
    displayPreview: true,
    focalPoint: true,
    disableLocalStorage: true,
    /**
     * Restrict mimeTypes in the file picker. Array of valid mime types or mimetype wildcards
     * @example ['image/*', 'application/pdf']
     * @default undefined
     */
    mimeTypes: [
      'image/*',
      'image/webp',
      'video/*',
      'text/plain',
      'application/json',
      'application/pdf', // PDF documents
      'application/msword' // DOC
    ],
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'original',
        withoutEnlargement: true,
        withoutReduction: true,
        height: 1500
      },
      {
        name: 'thumbnail',
        width: 300
      },
      {
        name: 'square',
        width: 500,
        height: 500
      },
      {
        name: 'small',
        width: 600
      },
      {
        name: 'medium',
        width: 900
      },
      {
        name: 'large',
        width: 1400
      },
      {
        name: 'xlarge',
        width: 1920
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center'
      }
    ],
    staticDir: path.resolve(dirname, '../../public/media')
  }
}
