import { getCachedDocBySlug } from '@data/getTattoo'

import configPromise from '@payload-config'

import { getPayload } from 'payload'

import { DocModalContent } from './DocModalContent'
import { DocModalProvider } from './DocModalProvider'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function TattooModal({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise

  const doc = await getCachedDocBySlug({ slug })
  if (!doc) return null

  return (
    <DocModalProvider>
      <DocModalContent doc={doc} />
    </DocModalProvider>
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
