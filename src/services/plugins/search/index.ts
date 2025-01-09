import { searchPlugin } from '@payloadcms/plugin-search'

import type { Plugin } from 'payload'

import { beforeSyncWithSearch } from './hooks/beforeSync'
import { INDEXED_COLLECTIONS } from '@constants/featureFlags'

export const searchPluginConfig: Plugin = searchPlugin({
  collections: INDEXED_COLLECTIONS,
  beforeSync: beforeSyncWithSearch,
  // defaultPriorities: {
  // },
  searchOverrides: {
    fields: ({ defaultFields }) => {
      return [
        ...defaultFields,
        {
          name: 'slug',
          type: 'text',
          index: true
          // admin: {
          //   readOnly: true
          // }
        },
        {
          name: 'meta',
          label: 'Meta',
          type: 'group',
          index: true,
          // admin: {
          //   readOnly: true
          // },
          fields: [
            {
              type: 'text',
              name: 'title',
              label: 'Title'
            },
            {
              type: 'text',
              name: 'description',
              label: 'Description'
            },
            {
              name: 'image',
              label: 'Image',
              type: 'upload',
              relationTo: 'media'
            }
          ]
        },
        {
          name: 'categories',
          type: 'join',
          collection: ['area', 'style'],
          admin: {
            readOnly: true
          },
          label: 'Categories'
        }
      ]
    },
    admin: {
      group: 'Settings'
    }
  }
})
