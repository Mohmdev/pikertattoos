import { searchPlugin } from '@payloadcms/plugin-search'

import type { Plugin } from 'payload'

import { beforeSyncWithSearch } from './beforeSync'

export const searchPluginConfig: Plugin = searchPlugin({
  collections: ['posts'],
  beforeSync: beforeSyncWithSearch,
  searchOverrides: {
    fields: ({ defaultFields }) => [
      ...defaultFields,
      {
        name: 'slug',
        type: 'text',
        index: true,
        admin: {
          readOnly: true
        }
      },
      {
        name: 'meta',
        label: 'Meta',
        type: 'group',
        index: true,
        admin: {
          readOnly: true
        },
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
        label: 'Categories',
        name: 'categories',
        type: 'array',
        admin: {
          readOnly: true
        },
        fields: [
          {
            name: 'relationTo',
            type: 'text'
          },
          {
            name: 'id',
            type: 'text'
          },
          {
            name: 'title',
            type: 'text'
          }
        ]
      }
    ]
  }
})
