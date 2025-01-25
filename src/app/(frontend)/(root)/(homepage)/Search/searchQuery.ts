'use server'

import configPromise from '@payload-config'

import { getPayload } from 'payload'

import type { Search } from '@payload-types'

export interface SearchResults {
  docs: Partial<Search>[]
  totalDocs: number
}

export async function searchTattoos(query: string | undefined): Promise<SearchResults> {
  if (!query) {
    return { docs: [], totalDocs: 0 }
  }

  const payload = await getPayload({ config: configPromise })

  const results = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      styles: true,
      image: true,
      doc: true
    },
    pagination: false,
    draft: false,
    where: {
      or: [
        {
          title: {
            contains: query
          }
        },
        {
          'styles.title': {
            contains: query
          }
        }
      ]
    }
  })

  return results
}
