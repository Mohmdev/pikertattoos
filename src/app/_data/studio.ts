import { unstable_cache } from 'next/cache'

import configPromise from '@payload-config'

import { getPayload } from 'payload'

export const fetchAreas = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })

    const results = await payload.find({
      collection: 'area',
      overrideAccess: false,
      pagination: false,
      where: {
        _status: {
          equals: 'published'
        }
      },
      depth: 1,
      select: {
        title: true,
        slug: true
      }
    })

    return results || { docs: [] }
  },
  ['areas-cache'],
  {
    // revalidate: 3600, // Cache for 1 hour
    tags: ['areas']
  }
)
