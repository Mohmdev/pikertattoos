import React from 'react'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { getCachedDocBySlug, getDraftDocBySlug } from '@data/getTattoo'

import configPromise from '@payload-config'

import { generateMeta } from '@seo/generateMeta'
import { getDynamicMeta } from '@seo/getDynamicMeta'
import { getPayload } from 'payload'

import type { Tattoo } from '@payload-types'

import { LivePreviewListener } from '@components/dynamic/LivePreviewListener'
import { PayloadRedirects } from '@components/dynamic/PayloadRedirects'

import { RenderDoc } from '../RenderDoc'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function TattooPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/tattoo/' + slug

  const getDoc = draft ? getDraftDocBySlug : getCachedDocBySlug
  const doc = await getDoc({ slug })

  if (!doc) return <PayloadRedirects url={url} />

  return (
    <>
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}
      <RenderDoc doc={doc as Partial<Tattoo>} />
    </>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const tattoos = await payload.find({
    collection: 'tattoo',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true
    }
  })

  return tattoos.docs.map((doc) => ({
    slug: String(doc.slug)
  }))
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const tattoo = await getCachedDocBySlug({ slug })

  if (!tattoo) {
    const { siteName, siteDescription } = await getDynamicMeta()
    return {
      title: `Not Found | ${siteName}`,
      description: siteDescription
    }
  }

  return generateMeta({ doc: tattoo })
}
