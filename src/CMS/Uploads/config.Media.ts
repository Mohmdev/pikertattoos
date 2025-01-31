import path from 'path'
import { fileURLToPath } from 'url'

import { basicLexical } from '@services/editor/basicLexical'
import { tagsField } from '@fields/shared/tagsField'
import { anyone } from '@access/anyone'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'

import type { CollectionConfig } from 'payload'

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
    // relatedTattoo: true,
    // tags: true
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'relatedTattoo', 'tags', 'mimeType', 'createdAt', 'updatedAt']
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description: 'For SEO and accessibility'
      }
    },
    {
      name: 'caption',
      type: 'richText',
      label: 'Caption',
      editor: basicLexical,
      admin: {
        description: 'Custom caption for the image'
      }
    },
    {
      type: 'join',
      name: 'relatedTattoo',
      label: false,
      collection: 'tattoo',
      on: 'images'
    },
    tagsField
  ],
  upload: {
    crop: true,
    displayPreview: true,
    focalPoint: true,
    disableLocalStorage: true,
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
