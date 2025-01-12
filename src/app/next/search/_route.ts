import { NextResponse } from 'next/server'

import configPromise from '@payload-config'

import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query) {
      return NextResponse.json({ docs: [], totalDocs: 0 })
    }

    const payload = await getPayload({ config: configPromise })
    const results = await payload.find({
      collection: 'search',
      depth: 1,
      limit: 6,
      select: {
        title: true,
        slug: true,
        image: true,
        styles: true
      },
      pagination: false,
      where: {
        or: [
          {
            title: {
              like: query
            }
          },
          {
            image: {
              like: query
            }
          },
          {
            styles: {
              like: query
            }
          },
          {
            slug: {
              like: query
            }
          }
        ]
      }
    })

    console.log('API Search Results:', results)

    return NextResponse.json(results)
  } catch (error) {
    console.error('Search API Error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
