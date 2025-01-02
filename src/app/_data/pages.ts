import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'

import configPromise from '@payload-config'

import { getPayload } from 'payload'

export const fetchCachedPageBySlug = async ({ slug }: { slug: string }) => {
  return unstable_cache(
    async () => {
      const { isEnabled: draft } = await draftMode()
      const payload = await getPayload({ config: configPromise })

      const result = await payload.find({
        collection: 'pages',
        draft,
        limit: 1,
        pagination: false,
        overrideAccess: draft,
        where: {
          slug: {
            equals: slug
          }
        }
      })

      return result.docs?.[0] || null
    },
    [`page-${slug}`],
    {
      tags: ['pages', `page-${slug}`],
      revalidate: 3600 // Cache for 1 hour
    }
  )()
}

// React Cache
// const fetchCachedPageBySlug = cache(async ({ slug }: { slug: string }) => {
//   const { isEnabled: draft } = await draftMode()

//   const payload = await getPayload({ config: configPromise })

//   const result = await payload.find({
//     collection: 'pages',
//     draft,
//     limit: 1,
//     pagination: false,
//     overrideAccess: draft,
//     where: {
//       slug: {
//         equals: slug
//       }
//     }
//   })

//   return result.docs?.[0] || null
// })
