import React from 'react'

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { cn } from '@utils/cn'

import type { Area, Artist, Media as MediaType, Style, Tag, Tattoo, User } from '@payload-types'

import { Media } from '@components/dynamic/Media'
import RichText from '@components/RichText'

import { RelatedDocs } from './RelatedDocs'

type Props = {
  doc: Partial<Tattoo>
  className?: string
}

export const RenderDoc = ({ doc, className }: Props) => {
  const { title, description, relatedDocs } = doc

  const images = Array.isArray(doc.images) ? (doc.images as MediaType[]) : undefined
  const mainImage = images?.[0]
  const galleryImages = images?.slice(1)

  const styles = Array.isArray(doc.style) ? (doc.style as Style[]) : undefined
  const tags = Array.isArray(doc.tags) ? (doc.tags as Tag[]) : undefined
  const areas = Array.isArray(doc.area) ? (doc.area as Area[]) : undefined
  const artists = Array.isArray(doc.artist) ? (doc.artist as Artist[]) : undefined

  return (
    <article className={cn('relative min-h-screen', className)}>
      {doc && (
        <>
          {/* Hero Section with Main Image */}
          <section className="group relative h-[80vh] w-full select-none">
            {mainImage ? (
              <div className="relative h-full w-full overflow-hidden">
                <div className="absolute inset-0 scale-[1.15] transform transition-all duration-1000 ease-out group-hover:scale-100">
                  <Media resource={mainImage} priority={true} fill className="object-cover" />
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br inset-0 m-0 flex h-full w-full items-center justify-center from-gray-800 to-gray-900">
                <div className="text-white/80">No Image Available</div>
              </div>
            )}
            {/* Gradient overlay for mobile */}
            <div className="bg-gradient-to-b absolute inset-0 from-black/20 via-transparent to-black/90 backdrop-blur-[2px] lg:hidden">
              <div className="container mx-auto flex h-full items-end pb-16">
                <div className="space-y-6 text-white">
                  <h1 className="text-5xl font-bold tracking-tight drop-shadow-lg md:text-6xl">
                    {title || ''}
                  </h1>
                  <div className="flex flex-wrap gap-3">
                    {styles?.map((style) => (
                      <span
                        key={style.id}
                        className="relative rounded-full border border-white/10 px-6 py-2 text-sm font-medium tracking-wide mix-blend-overlay backdrop-blur-md transition-all before:absolute before:inset-0 before:rounded-full before:bg-white/10 before:mix-blend-overlay hover:border-white/20 hover:bg-white/20"
                      >
                        {style.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="container mx-auto py-12 lg:py-24">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-[2fr,1fr]">
              {/* Left Column */}
              <div className="space-y-16">
                {/* Desktop Title */}
                <div className="hidden space-y-6 lg:block">
                  <h1 className="text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {title || ''}
                  </h1>
                  <div className="flex flex-wrap gap-3">
                    {styles?.map((style) => (
                      <span
                        key={style.id}
                        className="rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-medium tracking-wide shadow-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
                      >
                        {style.title}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gallery Grid */}
                {galleryImages && galleryImages.length > 0 && (
                  <div className="grid auto-rows-[300px] grid-cols-2 gap-6">
                    {galleryImages.map((image, index) => (
                      <div
                        key={image.id}
                        className={`group/image overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm transition-all hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 ${
                          index % 3 === 0 ? 'col-span-2 row-span-2' : ''
                        }`}
                      >
                        <Media
                          resource={image}
                          priority={true}
                          fill
                          className="object-cover transition-all duration-500 group-hover/image:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Description */}
                <div className="prose prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-gray-600 dark:prose-invert dark:prose-p:text-gray-300 max-w-none">
                  <RichText
                    data={description as SerializedEditorState}
                    enableGutter={false}
                    className="mx-auto max-w-[48rem]"
                  />
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="lg:sticky lg:top-8 lg:self-start">
                <div className="space-y-8">
                  {/* Artists Section */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
                    <h2 className="mb-6 text-xl font-semibold tracking-tight">Artists</h2>
                    <div className="space-y-3">
                      {artists?.map((artist) => (
                        <div
                          key={artist.id}
                          className="font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                        >
                          {(artist?.user as User)?.username || artist.title}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Areas Section */}
                  {areas && areas.length > 0 && (
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
                      <h2 className="mb-6 text-xl font-semibold tracking-tight">Placement</h2>
                      <div className="flex flex-wrap gap-2">
                        {areas.map((area) => (
                          <span
                            key={area.id}
                            className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium shadow-sm transition-all hover:border-gray-300 hover:shadow dark:border-gray-800 dark:bg-gray-800 dark:hover:border-gray-700"
                          >
                            {area.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags Section */}
                  {tags && tags.length > 0 && (
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
                      <h2 className="mb-6 text-xl font-semibold tracking-tight">Tags</h2>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium shadow-sm transition-all hover:border-gray-300 hover:shadow dark:border-gray-800 dark:bg-gray-800 dark:hover:border-gray-700"
                          >
                            {tag.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Related Works */}
            {relatedDocs && relatedDocs.length > 0 && (
              <div className="mt-24 border-t border-gray-200 pt-16 dark:border-gray-800">
                <h2 className="mb-12 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Related Works
                </h2>
                <RelatedDocs
                  docs={relatedDocs
                    .filter((doc) => typeof doc.value === 'object')
                    .map((doc) => doc.value as Tattoo)}
                />
              </div>
            )}
          </section>
        </>
      )}
    </article>
  )
}
