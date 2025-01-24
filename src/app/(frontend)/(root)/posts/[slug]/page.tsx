import React, { cache } from 'react'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import configPromise from '@payload-config'
import { RelatedContentBlock } from '@blocks/RelatedContentBlock/Component'

import { generateMeta } from '@seo/generateMeta'
import { getDynamicMeta } from '@seo/getDynamicMeta'
import { getPayload } from 'payload'
import { PostHero } from '@/heros/PostHero'

import type { Post } from '@/payload-types'

import { LivePreviewListener } from '@components/dynamic/LivePreviewListener'
import { PayloadRedirects } from '@components/dynamic/PayloadRedirects'
import RichText from '@components/RichText'

import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true
    }
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  const richTextContent = post?.richTextContent?.root
    ? ({ root: post.richTextContent.root } as SerializedEditorState)
    : null

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pb-16 pt-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          {richTextContent && (
            <RichText
              className="mx-auto max-w-[48rem]"
              data={richTextContent}
              enableGutter={false}
            />
          )}
          {post.relatedDocs && post.relatedDocs.length > 0 && (
            <RelatedContentBlock
              className="col-span-3 col-start-1 mt-12 max-w-[52rem] grid-rows-[2fr] lg:grid lg:grid-cols-subgrid"
              docs={post.relatedDocs
                .map((doc) => {
                  if (typeof doc.value === 'object' && doc.value !== null) {
                    return {
                      ...doc.value,
                      relationTo: doc.relationTo
                    }
                  }
                  return null
                })
                .filter(Boolean)}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  if (!post) {
    const { siteName, siteDescription } = await getDynamicMeta()
    return {
      title: `Not Found | ${siteName}`,
      description: siteDescription
    }
  }

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug
      }
    }
  })

  return result.docs?.[0] || null
})
