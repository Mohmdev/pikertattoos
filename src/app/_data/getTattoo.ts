import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'

import configPromise from '@payload-config'

import { getPayload } from 'payload'

export const getCachedDocBySlug = unstable_cache(async ({ slug }: { slug: string }) => {
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
      richTextContent: true,
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

export const getDraftDocBySlug = async ({ slug }: { slug: string }) => {
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
      richTextContent: true,
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
