import { slugField } from '@fields/shared/slug/config'
import { anyone } from '@access/anyone'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'

import type { CollectionConfig } from 'payload'

export const Area: CollectionConfig<'area'> = {
  slug: 'area',
  labels: {
    singular: 'Area',
    plural: 'Areas'
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    delete: isAdminOrSelf,
    update: isAdminOrSelf
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'parent', 'tattoos', 'createdAt', 'updatedAt']
  },
  defaultPopulate: {
    title: true,
    slug: true
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Area Name'
    },
    {
      name: 'tattoos',
      type: 'join',
      collection: 'tattoo',
      on: 'area'
    },
    ...slugField()
  ],
  versions: {
    drafts: true,
    maxPerDoc: 10
  }
}
