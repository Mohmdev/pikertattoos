import { fetchCachedPageBySlug } from '@data/pages'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@blocks/RenderBlocks'
import { RenderHero } from '@heros/RenderHero'
import configPromise from '@payload-config'

import { generateMeta } from '@seo/generateMeta'
import { getDynamicMeta } from '@seo/getDynamicMeta'
import { getPayload } from 'payload'

import type { Page as PageType } from '@payload-types'

import { LivePreviewListener } from '@components/dynamic/LivePreviewListener'
import { PayloadRedirects } from '@components/dynamic/PayloadRedirects'

import PageClient from './page.client'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise

  // Failsafe: prevent handling of root path
  if (!slug) {
    throw new Error('Root path "/" should be handled by homepage route')
  }

  const url = '/' + slug

  // biome-ignore lint/style/useConst: <explanation>
  let page: PageType | null

  // eslint-disable-next-line prefer-const
  page = await queryPageBySlug({
    slug,
  })

  const { hero, blocks } = page ? page : { hero: null, blocks: null }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  return (
    <article className="pb-24 pt-16">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {hero && <RenderHero {...hero} />}
      {blocks && <RenderBlocks blocks={blocks} />}
    </article>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      // Exclude home and empty slugs
      return doc.slug && doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug } = await paramsPromise

  if (!slug) {
    throw new Error('Root path "/" should be handled by homepage route')
  }

  const page = await fetchCachedPageBySlug({ slug })

  if (!page) {
    const { siteName, siteDescription } = await getDynamicMeta()
    return {
      title: `Not Found | ${siteName}`,
      description: siteDescription,
    }
  }

  return generateMeta({ doc: page })
}
