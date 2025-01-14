import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'

import configPromise from '@payload-config'

import { getDynamicMeta } from '@seo/getDynamicMeta'
import { mergeOpenGraph } from '@seo/mergeOpenGraph'
import { getPayload } from 'payload'
import { getServerSideURL } from '@utils/getURL'

import type { Homepage } from '@payload-types'

import { LivePreviewListener } from '@components/dynamic/LivePreviewListener'

import { CardDocData } from './components/Card'
import { RenderPage } from './RenderPage'

type Args = {
  searchParams: {
    q?: string
  }
}
export const dynamic = 'force-dynamic'

export default async function HomePage({ searchParams }: Args) {
  const { isEnabled: draft } = await draftMode()
  const getHomepage = draft ? getDraftHomepage : getCachedHomepage
  const homepage: Homepage = (await getHomepage()) || null

  if (!homepage) {
    return {}
  }

  const payload = await getPayload({ config: configPromise })
  const query = searchParams.q

  console.log('Server-side searchParams:', searchParams) // Debug log

  const queryTattoos = query
    ? await payload.find({
        collection: 'search',
        depth: 1,
        limit: 6,
        select: {
          title: true,
          slug: true,
          styles: true,
          image: true
        },
        pagination: false,
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
    : { docs: [], totalDocs: 0 }

  console.log('Search Query:', query)
  console.log('Search Results:', queryTattoos)

  return (
    <>
      {draft && <LivePreviewListener />}
      <RenderPage
        data={homepage}
        docs={queryTattoos.totalDocs > 0 ? (queryTattoos.docs as CardDocData[]) : null}
        searchQuery={query}
      />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const { siteName, siteDescription } = await getDynamicMeta()

  return {
    metadataBase: new URL(getServerSideURL()),
    title: siteName,
    description: siteDescription,
    openGraph: mergeOpenGraph(
      {
        title: siteName,
        description: siteDescription,
        url: '/'
      },
      {
        siteName,
        description: siteDescription
      }
    )
  }
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
