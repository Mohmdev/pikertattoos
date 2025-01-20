import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'

import configPromise from '@payload-config'

import { getDynamicMeta } from '@seo/getDynamicMeta'
import { mergeOpenGraph } from '@seo/mergeOpenGraph'
import { getPayload } from 'payload'
import { getServerSideURL } from '@utils/getURL'

import type { Homepage, Style } from '@payload-types'
import type { Payload } from 'payload'

import { LivePreviewListener } from '@components/dynamic/LivePreviewListener'

import { CardDocData } from './components/Card'
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
  const payload = await getPayload({ config: configPromise })

  const homepage: Homepage = await getHomepage(isDraft)

  if (!homepage) {
    return {}
  }

  const params = await searchParams
  const queryTattoos = await searchTattoos(payload, params.q)

  const styles = await getStyles(isDraft)

  console.log('Server-side searchParams:', params) // Debug log
  console.log('Search Query:', params.q)
  console.log('Search Results:', queryTattoos)

  return (
    <>
      {isDraft && <LivePreviewListener />}
      <RenderPage
        data={homepage}
        docs={queryTattoos.totalDocs > 0 ? (queryTattoos.docs as CardDocData[]) : null}
        searchQuery={params.q}
        categories={styles}
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
      featured: true
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

async function getStylesData(payload: Payload, isDraft: boolean) {
  const styles = await payload.find({
    collection: 'style',
    depth: 0,
    limit: 20,
    select: {
      title: true,
      slug: true
    },
    draft: isDraft,
    overrideAccess: isDraft
  })
  return styles.docs as Style[]
}

const getStyles = unstable_cache(
  async (isDraft: boolean) => {
    const payload = await getPayload({ config: configPromise })
    return getStylesData(payload, isDraft)
  },
  undefined // no tags
)
