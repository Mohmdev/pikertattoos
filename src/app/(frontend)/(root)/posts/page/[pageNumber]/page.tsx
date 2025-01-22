import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next/types'

import configPromise from '@payload-config'

import { getDynamicMeta } from '@seo/getDynamicMeta'
import { mergeOpenGraph } from '@seo/mergeOpenGraph'
import { getPayload } from 'payload'

import { CollectionArchive } from '@components/dynamic/CollectionArchive'
import { PageRange } from '@components/dynamic/PageRange'
import { Pagination } from '@components/dynamic/Pagination'

import PageClient from './page.client'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false
  })

  return (
    <div className="pb-24 pt-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Blog</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  const { siteName, siteDescription } = await getDynamicMeta()
  const pageTitle = pageNumber === '1' ? 'Blog' : `Blog - Page ${pageNumber}`
  const title = `${pageTitle} | ${siteName}`

  return {
    title,
    description: siteDescription,
    openGraph: mergeOpenGraph(
      {
        title,
        description: siteDescription,
        url: pageNumber === '1' ? '/posts' : `/posts/page/${pageNumber}`
      },
      {
        siteName,
        description: siteDescription
      }
    )
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
