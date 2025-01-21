import { revalidatePath, revalidateTag } from 'next/cache'

import type { Tattoo } from '@payload-types'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const revalidateTattoo: CollectionAfterChangeHook<Tattoo> = ({
  doc,
  previousDoc,
  req: { payload, context }
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/tattoo/${doc.slug}`

      payload.logger.info(`Revalidating tattoo at path: ${path}`)

      revalidatePath(path)
      revalidateTag('tattoos-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/tattoo/${previousDoc.slug}`

      payload.logger.info(`Revalidating old tattoo at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('tattoos-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Tattoo> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/tattoo/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('tattoos-sitemap')
  }

  return doc
}
