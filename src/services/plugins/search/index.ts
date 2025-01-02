import { searchPlugin } from '@payloadcms/plugin-search'

import type { Plugin } from 'payload'

import { searchFields } from './fields/fieldOverrides'
import { beforeSyncWithSearch } from './hooks/beforeSync'

import { INDEXED_COLLECTIONS } from '@constants/featureFlags'

export const searchPluginConfig: Plugin = searchPlugin({
  collections: INDEXED_COLLECTIONS,
  beforeSync: beforeSyncWithSearch,
  searchOverrides: {
    fields: ({ defaultFields }) => {
      return [...defaultFields, ...searchFields]
    },
    admin: {
      group: 'Settings'
    }
  }
})
