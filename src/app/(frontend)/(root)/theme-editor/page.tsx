import { LivePreviewListener } from '@components/dynamic/LivePreviewListener'
import configPromise from '@payload-config'
import { getDynamicMeta } from '@seo/getDynamicMeta'
import { mergeOpenGraph } from '@seo/mergeOpenGraph'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'
import { RenderPage } from './RenderPage'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'

export default async function ThemeEditorPage() {
  const { isEnabled: isDraft } = await draftMode()

  const docs = await getCachedPosts()

  if (!docs) {
    return <div>No records found.</div>
  }

  return (
    <>
      <PageClient />
      {isDraft && <LivePreviewListener />}
      <RenderPage data={docs} />
      {/* <AdminBar
        adminBarProps={{
          preview: isDraft,
        }}
      /> */}
    </>
  )
}

const getCachedPosts = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraft } = await draftMode()

  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 24,
    overrideAccess: isDraft,
    draft: isDraft,
    pagination: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return result.docs
})

export async function generateMetadata(): Promise<Metadata> {
  const { siteName, siteDescription } = await getDynamicMeta()
  const title = `Theme Editor | ${siteName}`

  return {
    title,
    description: siteDescription,
    openGraph: mergeOpenGraph(
      {
        title,
        description: siteDescription,
        url: '/theme-editor',
      },
      {
        siteName,
        description: siteDescription,
      },
    ),
  }
}
