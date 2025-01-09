import { revalidatePath, revalidateTag } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

export const homepageSitemapTag = 'cahce-homepage-sitemap'

export const revalidateHomepage: GlobalAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context }
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = '/'

      revalidatePath(path)
      payload.logger.info(`✓ Published Homepage Revalidated at path: "${path}"`)

      revalidateTag(homepageSitemapTag)
      payload.logger.info(`✓ Published Homepage Sitemap "${homepageSitemapTag}" Revalidated`)
    }

    // If the doc was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/homepage/${previousDoc.slug}`

      revalidatePath(oldPath)
      payload.logger.info(`✓ Previously Published Homepage Revalidated at path: "${oldPath}"`)
      revalidateTag(homepageSitemapTag)
      payload.logger.info(
        `✓ Previously Published Homepage Sitemap "${homepageSitemapTag}" Revalidated`
      )
    }
  }

  return doc
}
