import { revalidatePath } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

export const revalidateMainMenu: GlobalAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context }
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = '/'
      revalidatePath(path)
      payload.logger.info(`✓ Published Main Menu Revalidated at path: "${path}"`)
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/main-menu/${previousDoc.slug}`
      revalidatePath(oldPath)
      payload.logger.info(`✓ Previously Published Main Menu Revalidated at path: "${oldPath}"`)
    }
  }

  return doc
}
