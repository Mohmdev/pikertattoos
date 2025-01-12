import React from 'react'
import type { Metadata } from 'next/types'

import configPromise from '@payload-config'

import { getPayload } from 'payload'

// import type { Tattoo } from '@payload-types'

import { Search } from '../(homepage)/Search'
import { CardDocData } from './Card'
import { CollectionArchive } from './CollectionArchive'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const tattoos = await payload.find({
    collection: 'search',
    depth: 3,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query
                }
              },
              {
                'meta.description': {
                  like: query
                }
              },
              {
                'meta.title': {
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
        }
      : {})
  })

  return (
    <div className="pb-24 pt-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Search</h1>

          <div className="mx-auto max-w-[50rem]">
            <Search />
          </div>
        </div>
      </div>

      {tattoos.totalDocs > 0 ? (
        <CollectionArchive docs={tattoos.docs as CardDocData[]} />
      ) : (
        <div className="container">No results found.</div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Find Tattoos`
  }
}
