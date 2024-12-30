import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '@payload-types'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context }
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/blog/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag('blog-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/blog/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('blog-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/blog/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('blog-sitemap')
  }

  return doc
}