import React from 'react'

import type { Area, Artist, Media as MediaType, Style, Tag, Tattoo, User } from '@payload-types'
import type { SerializedEditorState } from 'node_modules/lexical/LexicalEditorState'

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
          <section className="relative h-[70vh] w-full">
            {mainImage && (
              <div className="absolute inset-0">
                <Media resource={mainImage} priority={true} />
              </div>
            )}
            <div className="bg-gradient-to-b absolute inset-0 from-transparent to-black/70">
              <div className="container mx-auto flex h-full items-end pb-8">
                <div className="space-y-4 text-white">
                  <h1 className="text-5xl font-bold">{title || ''}</h1>
                  <div className="flex flex-wrap gap-2">
                    {styles?.map((style) => (
                      <span
                        key={style.id}
                        className="rounded-full bg-white/10 px-4 py-1 text-sm backdrop-blur-sm"
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
          <section className="container mx-auto py-16">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-[2fr,1fr]">
              {/* Left Column - Gallery & Description */}
              <div className="space-y-12">
                {/* Gallery Grid */}
                {galleryImages && galleryImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {galleryImages.map((image) => (
                      <div key={image.id} className="aspect-square overflow-hidden">
                        <Media resource={image} priority={true} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Description */}
                <div className="prose prose-lg max-w-none">
                  <RichText
                    data={description as SerializedEditorState}
                    enableGutter={false}
                    className="mx-auto max-w-[48rem]"
                  />
                  {/* {hasDescription && (
                  )} */}
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-8">
                {/* Artists Section */}
                <div className="rounded-xl bg-gray-50 p-6 dark:bg-gray-900">
                  <h2 className="mb-4 text-xl font-semibold">Artists</h2>
                  <div className="space-y-2">
                    {artists && artistsUsernames
                      ? artistsUsernames?.map((username) => (
                          <div key={username} className="font-medium">
                            {username}
                          </div>
                        ))
                      : artists?.map((artist) => (
                          <div key={artist.id} className="font-medium">
                            {artist.title}
                          </div>
                        ))}
                  </div>
                </div>

                {/* Areas Section */}
                {areas && areas.length > 0 && (
                  <div className="rounded-xl bg-gray-50 p-6 dark:bg-gray-900">
                    <h2 className="mb-4 text-xl font-semibold">Placement</h2>
                    <div className="flex flex-wrap gap-2">
                      {areas.map((area) => (
                        <span
                          key={area.id}
                          className="rounded-full bg-gray-200 px-3 py-1 text-sm dark:bg-gray-800"
                        >
                          {area.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags Section */}
                {tags && tags.length > 0 && (
                  <div className="rounded-xl bg-gray-50 p-6 dark:bg-gray-900">
                    <h2 className="mb-4 text-xl font-semibold">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="rounded-full bg-gray-200 px-3 py-1 text-sm dark:bg-gray-800"
                        >
                          {tag.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Docs Section */}
            {relatedDocs && relatedDocs.length > 0 && (
              <div className="mt-16">
                <h2 className="mb-8 text-2xl font-bold">Related Works</h2>
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
