import { slugField } from '@fields/slug/config'

import type { CollectionConfig } from 'payload'

import { anyone } from '@access/anyone'
import { isAdmin } from '@access/isAdmin'
import { isAdminOrSelf } from '@access/isAdminOrSelf'

export const Artist: CollectionConfig<'artist'> = {
  slug: 'artist',
  labels: {
    singular: 'Artist',
    plural: 'Artists'
  },
  access: {
    read: anyone,
    create: isAdmin,
    delete: isAdminOrSelf,
    update: isAdminOrSelf
  },
  admin: {
    useAsTitle: 'title'
  },
  fields: [
    {
      name: 'title',
      label: 'Artist Name',
      type: 'text',
      required: true
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      label: 'Artist Profile',
      required: true
    },
    {
      name: 'style',
      type: 'relationship',
      relationTo: 'style',
      hasMany: true,
      label: {
        singular: 'Style',
        plural: 'Styles'
      }
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tag',
      hasMany: true,
      label: {
        singular: 'Tag',
        plural: 'Tags'
      }
    },
    ...slugField()
  ]
}
