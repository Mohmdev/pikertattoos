import { searchPlugin } from '@payloadcms/plugin-search'

import type { Plugin } from 'payload'

import { beforeSyncWithSearch } from './beforeSync'

export const searchPluginConfig: Plugin = searchPlugin({
  collections: ['tattoo'],
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
        name: 'image',
        label: 'Image',
        type: 'upload',
        relationTo: 'media',
        index: true,
        admin: {
          readOnly: true
        }
      },
      {
        name: 'styles',
        type: 'array',
        index: true,
        admin: {
          readOnly: true
        },
        fields: [
          {
            name: 'relationTo',
            type: 'text'
          },
          {
            name: 'title',
            type: 'text'
          }
        ]
      },
      {
        name: 'areas',
        type: 'array',
        index: true,
        admin: {
          readOnly: true
        },
        fields: [
          {
            name: 'relationTo',
            type: 'text'
          },
          {
            name: 'title',
            type: 'text'
          }
        ]
      }
    ],
    admin: {
      useAsTitle: 'title',
      defaultColumns: ['title', 'image', 'styles', 'areas', 'description'],
      group: 'Site Content'
    }
  }
})
