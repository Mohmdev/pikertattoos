import { generateGlobalPreviewPath } from '@services/live-preview/generateGlobalPreviewPath'
import type { GeneratePreviewURL, GlobalSlug } from 'payload'

export const getGlobalPreviewURL = (global: GlobalSlug): GeneratePreviewURL => {
  return (_data, { req }) => {
    return generateGlobalPreviewPath({
      global,
      slug: global, // For globals, slug is same as global name
      req,
    })
  }
}
