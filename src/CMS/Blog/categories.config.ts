import { slugField } from '@fields/shared/slug/config'
import { anyone } from '@access/anyone'
import { isUser } from '@access/isUser'

import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Blog Category',
    plural: 'Blog Categories'
  },
  access: {
    create: isUser,
    delete: isUser,
    read: anyone,
    update: isUser
  },
  admin: {
    useAsTitle: 'title'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    ...slugField()
  ]
}
