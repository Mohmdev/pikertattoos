import { slugField } from '@fields/slug/config'

import type { CollectionConfig } from 'payload'

import { anyone } from '@access/anyone'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'

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
    useAsTitle: 'title'
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
