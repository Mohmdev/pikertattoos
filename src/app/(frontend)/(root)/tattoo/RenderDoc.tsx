import React from 'react'

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import type { Area, Artist, Media as MediaType, Style, Tag, Tattoo, User } from '@payload-types'

import { Media } from '@components/dynamic/Media'
import RichText from '@components/RichTextBasic'

import { RelatedDocs } from './RelatedDocs'

export const RenderDoc = ({ doc }: { doc: Partial<Tattoo> }) => {
  const { title, description, relatedDocs } = doc

  const images = Array.isArray(doc.images) ? (doc.images as MediaType[]) : undefined
  const mainImage = images?.[0]
  const galleryImages = images?.slice(1)

  const styles = Array.isArray(doc.style) ? (doc.style as Style[]) : undefined
  const tags = Array.isArray(doc.tags) ? (doc.tags as Tag[]) : undefined
  const areas = Array.isArray(doc.area) ? (doc.area as Area[]) : undefined
  const artists = Array.isArray(doc.artist) ? (doc.artist as Artist[]) : undefined
  const artistsUsernames = artists?.map((artist) => (artist?.user as User)?.username)

  return (
    <article className="min-h-screen">
      {doc && (
        <>
          {/* Hero Section with Main Image */}
          <section className="group relative h-[80vh] w-full">
            {mainImage ? (
              <div className="relative h-full w-full overflow-hidden">
                <div className="duration-[2000ms] absolute inset-0 scale-[1.15] transform transition-all ease-out group-hover:scale-100">
                  <Media resource={mainImage} priority={true} fill className="object-cover" />
                </div>
              </div>
            ) : (
              <div className="inset-0 m-0 flex h-full w-full items-center justify-center bg-gray-500">
                <div className="text-white">No Image</div>
              </div>
            )}
            {/* Gradient overlay for mobile */}
            <div className="bg-gradient-to-b absolute inset-0 from-transparent via-transparent to-black/90 lg:hidden">
              <div className="container mx-auto flex h-full items-end pb-16">
                <div className="space-y-6 text-white">
                  <h1 className="text-6xl font-bold tracking-tight">{title || ''}</h1>
                  <div className="flex flex-wrap gap-3">
                    {styles?.map((style) => (
                      <span
                        key={style.id}
                        className="rounded-full bg-white/10 px-6 py-2 text-sm font-medium tracking-wide backdrop-blur-sm transition-colors hover:bg-white/20"
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
              {/* Left Column - Title (on large screens), Gallery & Description */}
              <div className="space-y-16">
                {/* Title for large screens */}
                <div className="hidden space-y-6 lg:block">
                  <h1 className="text-6xl font-bold tracking-tight">{title || ''}</h1>
                  <div className="flex flex-wrap gap-3">
                    {styles?.map((style) => (
                      <span
                        key={style.id}
                        className="rounded-full bg-gray-100 px-6 py-2 text-sm font-medium tracking-wide transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
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
                        className={`overflow-hidden rounded-xl ${
                          index % 3 === 0 ? 'col-span-2 row-span-2' : ''
                        }`}
                      >
                        <Media
                          resource={image}
                          priority={true}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Description */}
                <div className="prose prose-lg prose-headings:font-bold prose-p:text-gray-600 dark:prose-p:text-gray-300 max-w-none">
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
                  <div className="rounded-xl bg-gray-50/50 p-8 backdrop-blur-sm dark:bg-gray-900/50">
                    <h2 className="mb-6 text-xl font-semibold">Artists</h2>
                    <div className="space-y-3">
                      {artists && artistsUsernames
                        ? artistsUsernames?.map((username) => (
                            <div
                              key={username}
                              className="font-medium text-gray-700 dark:text-gray-300"
                            >
                              {username}
                            </div>
                          ))
                        : artists?.map((artist) => (
                            <div
                              key={artist.id}
                              className="font-medium text-gray-700 dark:text-gray-300"
                            >
                              {artist.title}
                            </div>
                          ))}
                    </div>
                  </div>

                  {/* Areas Section */}
                  {areas && areas.length > 0 && (
                    <div className="rounded-xl bg-gray-50/50 p-8 backdrop-blur-sm dark:bg-gray-900/50">
                      <h2 className="mb-6 text-xl font-semibold">Placement</h2>
                      <div className="flex flex-wrap gap-2">
                        {areas.map((area) => (
                          <span
                            key={area.id}
                            className="rounded-full bg-gray-200/80 px-4 py-2 text-sm font-medium dark:bg-gray-800/80"
                          >
                            {area.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags Section */}
                  {tags && tags.length > 0 && (
                    <div className="rounded-xl bg-gray-50/50 p-8 backdrop-blur-sm dark:bg-gray-900/50">
                      <h2 className="mb-6 text-xl font-semibold">Tags</h2>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="rounded-full bg-gray-200/80 px-4 py-2 text-sm font-medium dark:bg-gray-800/80"
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

            {/* Related Docs Section */}
            {relatedDocs && relatedDocs.length > 0 && (
              <div className="mt-24 border-t border-gray-200 pt-16 dark:border-gray-800">
                <h2 className="mb-12 text-3xl font-bold">Related Works</h2>
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
