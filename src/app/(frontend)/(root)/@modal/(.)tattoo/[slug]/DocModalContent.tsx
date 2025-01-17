'use client'

import React from 'react'
import Image from 'next/image'

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { cn } from '@utils/cn'

import type { Area, Artist, Media as MediaType, Style, Tag, Tattoo, User } from '@payload-types'

import RichText from '@components/RichText'
import { DialogDescription, DialogTitle } from '@ui/dialog'

type Props = {
  doc: Partial<Tattoo>
  className?: string
}

export const DocModalContent = ({ doc, className }: Props) => {
  const { title, description } = doc

  const images = Array.isArray(doc.images) ? (doc.images as MediaType[]) : undefined
  const mainImage = images?.[0]
  //   const galleryImages = images?.slice(1)

  const styles = Array.isArray(doc.style) ? (doc.style as Style[]) : undefined
  const tags = Array.isArray(doc.tags) ? (doc.tags as Tag[]) : undefined
  const areas = Array.isArray(doc.area) ? (doc.area as Area[]) : undefined
  const artists = Array.isArray(doc.artist) ? (doc.artist as Artist[]) : undefined

  return (
    <article
      className={cn(
        'relative size-full overflow-y-auto',
        // 'flex flex-col items-center justify-center',
        className
      )}
    >
      {/* Main Image */}
      <section className="group relative h-full max-h-[60%] w-full select-none overflow-hidden">
        {mainImage ? (
          <div className="absolute inset-0 scale-[1.06] transform transition-all duration-1000 ease-out group-hover:scale-100">
            {mainImage.url && (
              <Image
                src={mainImage.url}
                alt={mainImage.alt || ''}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
        ) : (
          <div className="bg-gradient-to-br inset-0 m-0 flex h-full w-full items-center justify-center from-gray-800 to-gray-900">
            <div className="text-white/80">No Image Available</div>
          </div>
        )}
      </section>

      {/* Doc info */}
      <section className="p-6">
        <div className="flex flex-row flex-wrap items-center justify-between gap-6">
          <DialogTitle className="mb-2 text-2xl font-bold">{title || ''}</DialogTitle>

          <div className="flex flex-row flex-wrap items-center justify-between gap-6">
            {(artists?.filter(isArtist) ?? []).map((artist) => (
              <div
                key={artist.id}
                className="font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                {(artist.user as User)?.username}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-2">
          {/* Styles Section */}
          <div className="flex flex-wrap gap-3">
            {(styles?.filter(isStyle) ?? []).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(styles?.filter(isStyle) ?? []).map((style) => (
                  <span
                    key={style.id}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-semibold"
                  >
                    {style.title}
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* Areas Section */}
          {(areas?.filter(isArea) ?? []).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {(areas?.filter(isArea) ?? []).map((area) => (
                <span
                  key={area.id}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-semibold"
                >
                  {area.title}
                </span>
              ))}
            </div>
          )}
        </div>

        <DialogDescription asChild className="mb-6">
          {description ? (
            <RichText
              data={description as SerializedEditorState}
              enableGutter={false}
              className="mx-auto"
            />
          ) : (
            ''
          )}
        </DialogDescription>

        {/* Tags Section */}
        {(tags?.filter(isTag) ?? []).length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags?.filter(isTag).map((tag) => (
              <span
                key={tag.id}
                className={cn(
                  //
                  'rounded-md px-0 py-1',
                  // 'bg-muted',
                  'text-xs text-muted-foreground'
                )}
              >
                <span className="mr-0.5 text-[0.825rem]">#</span>
                {tag.title}
              </span>
            ))}
          </div>
        )}
      </section>
    </article>
  )
}

// const isMedia = (media: Media | number): media is Media & { url: string } => {
//   return typeof media !== 'number' && 'url' in media && typeof media.url === 'string'
// }

const isStyle = (style: Style | number): style is Style => {
  return typeof style !== 'number' && 'title' in style
}

const isArtist = (artist: Artist | number): artist is Artist => {
  return typeof artist !== 'number' && 'title' in artist
}

const isArea = (area: Area | number): area is Area => {
  return typeof area !== 'number' && 'title' in area
}

const isTag = (tag: Tag | number): tag is Tag => {
  return typeof tag !== 'number' && 'title' in tag
}
