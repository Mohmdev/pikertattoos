import { seoPlugin } from '@payloadcms/plugin-seo'

import { getServerSideURL } from '@utils/getURL'

import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import type { Plugin } from 'payload'

import { SEO_ENABLED_COLLECTIONS, SEO_ENABLED_GLOBALS } from '@constants/featureFlags'

const generateURL: GenerateURL = ({ doc }) => {
  const url = getServerSideURL()
  return doc?.slug ? `${url}/${doc.slug}` : url
}

const generateTitle: GenerateTitle = ({ doc }) => {
  return doc?.title ? `${doc.title} | Pikertattoos` : 'Pikertattoos'
}

export type GenerateTitle2<T = unknown> = (args: {
  doc: T
  locale?: string
}) => Promise<string> | string

export const seoPluginConfig: Plugin = seoPlugin({
  generateTitle,
  generateURL,
  collections: SEO_ENABLED_COLLECTIONS,
  globals: SEO_ENABLED_GLOBALS,
  uploadsCollection: 'media'
})