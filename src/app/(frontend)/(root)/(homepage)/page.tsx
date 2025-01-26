import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'

import configPromise from '@payload-config'

import { getDynamicMeta } from '@seo/getDynamicMeta'
import { mergeOpenGraph } from '@seo/mergeOpenGraph'
import { getPayload } from 'payload'
import { getServerSideURL } from '@utils/getURL'

import type { Homepage } from '@payload-types'
import type { Payload } from 'payload'

import { LivePreviewListener } from '@components/dynamic/LivePreviewListener'

import PageClient from './page.client'
import { RenderPage } from './RenderPage'
import { searchTattoos } from './Search/searchQuery'

type Args = {
  searchParams: Promise<{
    q?: string
  }>
}
export const dynamic = 'force-dynamic'

export default async function HomePage({ searchParams }: Args) {
  const { isEnabled: isDraft } = await draftMode()

  const homepage: Homepage = await getHomepage(isDraft)

  if (!homepage) {
    return {}
  }

  const params = await searchParams

  const runQuery = await searchTattoos(params.q)
  const { docs: returnedResults, totalDocs: totalResults } = runQuery

  console.log('Server-side searchParams:', params)
  console.log('Search Query:', params.q)
  console.log('Search Results:', returnedResults)

  return (
    <>
      <PageClient />
      {isDraft && <LivePreviewListener />}
      <RenderPage
        data={homepage}
        searchQuery={params.q}
        searchResults={totalResults > 0 ? returnedResults : null}
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

async function getHomepageData(payload: Payload, isDraft: boolean) {
  return await payload.findGlobal({
    slug: 'homepage',
    depth: 2,
    draft: isDraft,
    overrideAccess: isDraft,
    select: {
      heading: true,
      subheading: true,
      gradientBackground: true,
      search: true,
      gridView: true
    }
  })
}
const getHomepage = unstable_cache(
  async (isDraft: boolean) => {
    const payload = await getPayload({ config: configPromise })
    return getHomepageData(payload, isDraft)
  },
  undefined // no tags
)
