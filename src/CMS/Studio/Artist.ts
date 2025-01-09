import { basicLexical } from '@services/editor/basicLexical'
import { slugField } from '@fields/shared/slug/config'
import { tagsField } from '@fields/shared/tagsField'
import { anyone } from '@access/anyone'
import { isAdmin } from '@access/isAdmin'
import { isAdminOrSelf } from '@access/isAdminOrSelf'

import type { CollectionConfig } from 'payload'

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
    useAsTitle: 'title',
    defaultColumns: ['user', 'title', 'style', 'tattoos', 'createdAt', 'updatedAt']
  },
  defaultPopulate: {
    title: true,
    slug: true,
    user: true
  },
  fields: [
    {
      name: 'title',
      label: 'Artist Name',
      type: 'text',
      required: true,
      index: true
    },
    {
      type: 'row',
      fields: [
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
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          label: 'Artist Profile',
          admin: {
            description:
              'Associate this artist with a user account to enable them to log in and manage their own content.'
          }
        }
      ]
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'richText',
      editor: basicLexical
    },
    {
      name: 'tattoos',
      type: 'join',
      collection: 'tattoo',
      on: 'artist',
      label: 'Portfolio',
      admin: {
        description:
          'Associate this artist with a user account to enable them to log in and manage their own content.'
      }
    },

    tagsField,
    ...slugField()
  ],
  versions: {
    drafts: true,
    maxPerDoc: 10
  }
}
