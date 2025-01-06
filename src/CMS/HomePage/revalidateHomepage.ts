import { revalidateTag } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

export const revalidateHomepage: GlobalAfterChangeHook = ({
  doc,
  // previousDoc,
  req: { payload, context }
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      // const path = '/'
      const tag = 'global_homepage'

      revalidateTag(tag)
      payload.logger.info(`✓ Homepage Tag Revalidated.`)
      // revalidateTag('homepage-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    // if (previousDoc._status === 'published' && doc._status !== 'published') {
    //   const oldPath = `/${previousDoc}`

    //   revalidatePath(oldPath)
    //   payload.logger.info(`✓ Revalidated old Homepage at path "${oldPath}".`)
    //   // revalidateTag('homepage-sitemap')
    // }
  }
  return doc
}

// export const revalidateHomepage: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
//   if (!context.disableRevalidate) {
//     if (doc._status === 'published') {
//       revalidateTag('global_homepage') // For reusable homepage components
//       revalidateTag('pages-sitemap') // For sitemap updates

//       payload.logger.info(`✔ Homepage Tag Revalidated.`)
//       // payload.logger.info(`✔ Homepage Revalidated at path: /`)
//     }
//   }

//   return doc
// }
