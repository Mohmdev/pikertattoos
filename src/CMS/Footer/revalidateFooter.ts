import { revalidatePath } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

export const revalidateFooter: GlobalAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context }
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = '/'
      revalidatePath(path)
      payload.logger.info(`✓ Published Footer Revalidated at path: "${path}"`)
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/footer/${previousDoc.slug}`
      revalidatePath(oldPath)
      payload.logger.info(`✓ Previously Published Footer Revalidated at path: "${oldPath}"`)
    }
  }

  return doc
}
