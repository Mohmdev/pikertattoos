import { slugField } from '@fields/shared/slug/config'
import { anyone } from '@access/anyone'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'

import type { CollectionConfig } from 'payload'

export const Tag: CollectionConfig<'tag'> = {
  slug: 'tag',
  labels: {
    singular: 'Tag',
    plural: 'Tags'
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
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tag Name',
      required: true
    },
    {
      name: 'tattoos',
      type: 'join',
      collection: 'tattoo',
      on: 'tags'
    },
    {
      name: 'artists',
      type: 'join',
      collection: 'artist',
      on: 'tags'
    },
    ...slugField()
  ],
  versions: {
    drafts: true,
    maxPerDoc: 10
  }
}
