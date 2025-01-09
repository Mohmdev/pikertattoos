import React, { cache } from 'react'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { fetchCachedPageBySlug } from '@data/pages'

import configPromise from '@payload-config'
import { RenderHero } from '@heros/RenderHero'
import { RenderBlocks } from '@blocks/RenderBlocks'

import { generateMeta } from '@seo/generateMeta'
import { getPayload } from 'payload'

import type { Page as PageType } from '@payload-types'

import { LivePreviewListener } from '@components/dynamic/LivePreviewListener'
import { PayloadRedirects } from '@components/dynamic/PayloadRedirects'

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
        equals: slug
      }
    }
  })

  return result.docs?.[0] || null
})

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  let page: PageType | null

  // eslint-disable-next-line prefer-const
  page = await queryPageBySlug({
    slug
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  return (
    <article className="pb-24 pt-16">
      {/* <PageClient /> */}
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero firstContentBlock={page.layout[0]} page={page} />
      <RenderBlocks blocks={page.layout} />
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
      slug: true
    }
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

export async function generateMetadata({ params: paramsPromise }): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await fetchCachedPageBySlug({
    slug
  })

  return generateMeta({ doc: page })
}
