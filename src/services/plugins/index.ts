import type { Plugin } from 'payload'

import { formBuilderPluginConfig } from './formBuilder'
import { nestedDocsPluginConfig } from './nestedDocs'
import { redirectsPluginConfig } from './redirects'
import { searchPluginConfig } from './search'
import { seoPluginConfig } from './seo'
import { storagePlugin } from './storage'

import { ENABLED_PLUGINS } from '@constants/featureFlags'

export const pluginsConfig: Plugin[] = [
  ...(ENABLED_PLUGINS.storage ? [storagePlugin] : []),
  ...(ENABLED_PLUGINS.formBuilder ? [formBuilderPluginConfig] : []),
  ...(ENABLED_PLUGINS.redirects ? [redirectsPluginConfig] : []),
  ...(ENABLED_PLUGINS.nestedDocs ? [nestedDocsPluginConfig] : []),
  ...(ENABLED_PLUGINS.search ? [searchPluginConfig] : []),
  ...(ENABLED_PLUGINS.seo ? [seoPluginConfig] : [])
]
