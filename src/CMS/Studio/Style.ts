import { slugField } from '@fields/shared/slug/config'

import type { CollectionConfig } from 'payload'

import { anyone } from '@access/anyone'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'

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
    useAsTitle: 'title'
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
