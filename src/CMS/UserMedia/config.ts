import type { CollectionConfig } from 'payload'

import { anyone } from '@access/anyone'
import { isAdminOrSelf } from '@access/isAdminOrSelf'

export const UserPhotos: CollectionConfig<'user-photo'> = {
  slug: 'user-photo',
  labels: {
    singular: 'User Photo',
    plural: 'User Photos'
  },
  access: {
    read: anyone,
    create: isAdminOrSelf,
    delete: isAdminOrSelf,
    update: isAdminOrSelf
  },
  defaultPopulate: {
    filename: true,
    user: true,
    url: true,
    height: true,
    width: true,
    mimeType: true
  },
  admin: {
    defaultColumns: ['thumbnail', 'user', 'createdAt', 'updatedAt']
  },
  fields: [
    {
      name: 'alt',
      type: 'text'
    },
    {
      type: 'join',
      name: 'user',
      collection: 'users',
      on: 'photo',
      label: 'User'
    }
  ],
  upload: {
    crop: true,
    displayPreview: true,
    focalPoint: true,
    disableLocalStorage: true,
    adminThumbnail: 'thumbnail',
    imageSizes: [
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
      }
    ]
  }
}
