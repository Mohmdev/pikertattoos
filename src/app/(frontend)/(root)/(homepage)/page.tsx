import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'

import configPromise from '@payload-config'

import { mergeOpenGraph } from '@seo/mergeOpenGraph'
import { getPayload } from 'payload'
import { getServerSideURL } from '@utils/getURL'

import type { Homepage } from '@payload-types'

import { LivePreviewListener } from '@components/dynamic/LivePreviewListener'

import { RenderPage } from './RenderPage'

export const dynamic = 'force-static'
export const revalidate = 86400 // 24 hours

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()

  const getHomepage = draft ? getDraftHomepage : getCachedHomepage

  const homepage: Homepage = (await getHomepage()) || null

  if (!homepage) {
    return {}
  }

  return (
    <>
      {draft && <LivePreviewListener />}
      <RenderPage data={homepage} />
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
