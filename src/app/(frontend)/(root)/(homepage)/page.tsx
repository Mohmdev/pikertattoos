import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'

import configPromise from '@payload-config'

import { mergeOpenGraph } from '@seo/mergeOpenGraph'
import { getPayload } from 'payload'
import { getServerSideURL } from '@utils/getURL'

import type { Homepage } from '@payload-types'

import { LivePreviewListener } from '@components/dynamic/LivePreviewListener'

import { CardDocData } from '../tattoos/Card'
import { RenderPage } from './RenderPage'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export const dynamic = 'force-static'
export const revalidate = 86400 // 24 hours

export default async function HomePage({ searchParams: searchParamsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()

  const getHomepage = draft ? getDraftHomepage : getCachedHomepage

  const homepage: Homepage = (await getHomepage()) || null

  if (!homepage) {
    return {}
  }

  const payload = await getPayload({ config: configPromise })
  const { q: query } = await searchParamsPromise
  const queryTattoos = await payload.find({
    collection: 'search',
    depth: 2,
    limit: 6,
    select: {
      title: true,
      slug: true,
      styles: true,
      image: true
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
        }
      : {})
  })

  return (
    <>
      {draft && <LivePreviewListener />}
      <RenderPage
        data={homepage}
        docs={queryTattoos.totalDocs > 0 ? (queryTattoos.docs as CardDocData[]) : null}
      />
    </>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  title: 'Piker Tattoos Studio',
  description:
    'Piker Studio, where artistry meets skin! We transform your ideas, blend them with creativity and precision and we create tattoos that tell your unique story.'
}

const getCachedHomepage = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const doc = await payload.findGlobal({
      slug: 'homepage',
      depth: 2,
      draft: false,
      overrideAccess: false,
      select: {
        title: true,
        subtitle: true,
        featured: true
      }
    })
    return doc
  },
  undefined // no tags
  // { revalidate: 3600 }
)

const getDraftHomepage = async () => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const doc = await payload.findGlobal({
    slug: 'homepage',
    depth: 2,
    draft,
    overrideAccess: draft,
    select: {
      title: true,
      subtitle: true,
      featured: true
    }
  })
  return doc
}
