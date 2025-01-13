import React from 'react'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'

import configPromise from '@payload-config'

import { generateMeta } from '@seo/generateMeta'
import { getPayload } from 'payload'

import type { Tattoo } from '@payload-types'

import { LivePreviewListener } from '@components/dynamic/LivePreviewListener'
import { PayloadRedirects } from '@components/dynamic/PayloadRedirects'

import { RenderDoc } from '../RenderDoc'

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

  const params = tattoos.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

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
  const doc: Partial<Tattoo> = (await getDoc({ slug })) || null

  if (!doc) return <PayloadRedirects url={url} />

  return (
    <>
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}
      <RenderDoc doc={doc} />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const tattoo = await getCachedDocBySlug({ slug })

  return generateMeta({ doc: tattoo })
}

const getCachedDocBySlug = unstable_cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })
  const doc = await payload.find({
    collection: 'tattoo',
    draft: false,
    overrideAccess: false,
    depth: 2,
    limit: 1,
    pagination: false,
    select: {
      title: true,
      slug: true,
      description: true,
      relatedDocs: true,
      images: true,
      style: true,
      area: true,
      artist: true,
      tags: true
    },
    where: {
      slug: {
        equals: slug
      }
    }
  })
  return doc.docs?.[0] || null
}, undefined)

const getDraftDocBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const doc = await payload.find({
    collection: 'tattoo',
    draft,
    overrideAccess: draft,
    depth: 2,
    limit: 1,
    pagination: false,
    select: {
      title: true,
      slug: true,
      description: true,
      relatedDocs: true,
      images: true,
      style: true,
      area: true,
      artist: true,
      tags: true
    },
    where: {
      slug: {
        equals: slug
      }
    }
  })
  return doc.docs?.[0] || null
}
