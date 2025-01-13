import React from 'react'

import type { Area, Artist, Media as MediaType, Style, Tag, Tattoo, User } from '@payload-types'

import { Media } from '@components/dynamic/Media'
import RichText from '@components/RichText'

import { RelatedDocs } from './RelatedDocs'

export const RenderDoc = ({ doc }: { doc: Partial<Tattoo> }) => {
  const { title, description, relatedDocs } = doc

  const images = Array.isArray(doc.images) ? (doc.images as MediaType[]) : undefined

  const styles = Array.isArray(doc.style) ? (doc.style as Style[]) : undefined

  const tags = Array.isArray(doc.tags) ? (doc.tags as Tag[]) : undefined

  const areas = Array.isArray(doc.area) ? (doc.area as Area[]) : undefined

  const artists = Array.isArray(doc.artist) ? (doc.artist as Artist[]) : undefined
  const artistsUsernames = artists?.map((artist) => (artist?.user as User)?.username)

  return (
    <article className="pb-16 pt-16">
      {doc && (
        <div className="flex flex-col items-center gap-4 pt-8">
          <div className="container">
            {/* Gallery */}
            <div className="">
              {images &&
                images.map((image) => (
                  <div key={image.id}>
                    <Media resource={image} />
                  </div>
                ))}
            </div>
            {/* Title */}
            <h1 className="text-center text-4xl font-bold">{title || ''}</h1>
            {/* Styles */}
            <div>
              {styles?.map((style) => (
                <h2 key={style.id} className="text-center text-2xl font-bold">
                  {style.title || ''}
                </h2>
              ))}
            </div>
            {/* Areas */}
            <div>
              {areas?.map((area) => (
                <h2 key={area.id} className="text-center text-2xl font-bold">
                  {area.title || ''}
                </h2>
              ))}
            </div>
            {/* Artists */}
            <div>
              {artists && artistsUsernames
                ? artistsUsernames?.map((username) => (
                    <h2 key={username} className="text-center text-2xl font-bold">
                      {username || ''}
                    </h2>
                  ))
                : artists?.map((artist) => (
                    <h2 key={artist.id} className="text-center text-2xl font-bold">
                      {artist.title || ''}
                    </h2>
                  ))}
            </div>
            {/* Description */}
            {description && (
              <RichText className="mx-auto max-w-[48rem]" data={description} enableGutter={false} />
            )}
            {/* Tags */}
            <div>
              {tags?.map((tag) => (
                <h2 key={tag.id} className="text-center text-2xl font-bold">
                  {tag.title || ''}
                </h2>
              ))}
            </div>
            {/* Related Docs */}
            {relatedDocs && relatedDocs.length > 0 && (
              <RelatedDocs
                className="col-span-3 col-start-1 mt-12 max-w-[52rem] grid-rows-[2fr] lg:grid lg:grid-cols-subgrid"
                docs={relatedDocs
                  .filter((doc) => typeof doc.value === 'object')
                  .map((doc) => doc.value as Tattoo)}
              />
            )}
          </div>
        </div>
      )}
    </article>
  )
}
