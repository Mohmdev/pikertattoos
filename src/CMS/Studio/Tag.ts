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
    defaultColumns: ['image', 'title', 'tattoos', 'artists', 'createdAt', 'updatedAt']
  },
  defaultPopulate: {
    title: true,
    slug: true
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tag Name',
      required: true
    },
    {
      type: 'tabs',
      tabs: [
        // Tattoo
        {
          label: 'Tattoos',
          fields: [
            {
              name: 'tattoos',
              type: 'join',
              collection: 'tattoo',
              on: 'tags'
            }
          ]
        },
        // Artists
        {
          label: 'Artists',
          fields: [
            {
              name: 'artists',
              type: 'join',
              collection: 'artist',
              on: 'tags'
            }
          ]
        }
      ]
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      hasMany: false,
      label: 'Tag Image',
      admin: {
        description: 'Optional'
      }
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        placeholder: 'Optional'
      }
    },
    ...slugField()
  ],
  versions: {
    drafts: true,
    maxPerDoc: 10
  }
}
