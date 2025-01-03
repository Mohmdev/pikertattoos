import { slugField } from '@fields/shared/slug/config'
import { anyone } from '@access/anyone'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'

import type { CollectionConfig } from 'payload'

export const Style: CollectionConfig<'style'> = {
  slug: 'style',
  labels: {
    singular: 'Style',
    plural: 'Styles'
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    delete: isAdminOrSelf,
    update: isAdminOrSelf
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tattoos', 'artists', 'createdAt', 'updatedAt']
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
      label: 'Style Name'
    },
    {
      name: 'tattoos',
      type: 'join',
      collection: 'tattoo',
      on: 'style'
    },
    {
      name: 'artists',
      type: 'join',
      collection: 'artist',
      on: 'style'
    },
    ...slugField()
  ],
  versions: {
    drafts: true,
    maxPerDoc: 10
  }
}
