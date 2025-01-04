// Goal: Fetch images from Media collection that have the property of `category` and value 'tattoo'
// Docs => Media, Query => { category: 'tattoo' }
// Caching system: Nextjs unstable_cache

import { unstable_cache } from 'next/cache'

import configPromise from '@payload-config'

import { getPayload } from 'payload'

import type { Payload } from 'payload'

export const fetchCachedTattooMedia = async () => {
  return unstable_cache(
    async () => {
      const payload = await getPayload({ config: configPromise })

      const results = await payload.find({
        collection: 'media',
        limit: 21,
        pagination: false,
        where: {
          category: {
            equals: 'tattoo'
          }
        },
        select: {
          url: true,
          alt: true,
          sizes: true
        }
      })

      return results || { docs: [] }
    },
    [`page-stage`],
    {
      tags: ['in-view-images-grid', `page-stage`],
      revalidate: 3600
    }
  )()
}

export const getTattooMedia = async (payload: Payload) => {
  const results = await payload.find({
    collection: 'media',
    limit: 21,
    pagination: false,
    where: {
      category: {
        equals: 'tattoo'
      }
    },
    select: {
      url: true,
      alt: true,
      updatedAt: true,
      createdAt: true
    }
  })

  return results || { docs: [] }
}
