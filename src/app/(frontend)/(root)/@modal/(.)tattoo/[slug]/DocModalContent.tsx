'use client'

import React from 'react'
import Image from 'next/image'

import { cn } from '@utils/cn'

import type { Area, Artist, Media as MediaType, Style, Tag, Tattoo, User } from '@payload-types'

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
  const artistsUsernames = artists?.map((artist) => (artist?.user as User)?.username)

  return (
    <article className={cn('h-full max-h-screen', className)}>
      {/* Main Image */}
      {mainImage ? (
        <div className="relative h-full w-full overflow-hidden">
          <div className="absolute inset-0 scale-[1.15] transform transition-all duration-1000 ease-out group-hover:scale-100">
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
        </div>
      ) : (
        <div className="bg-gradient-to-br inset-0 m-0 flex h-full w-full items-center justify-center from-gray-800 to-gray-900">
          <div className="text-white/80">No Image Available</div>
        </div>
      )}
      <DialogTitle>{title || ''}</DialogTitle>
      <DialogDescription>
        <div dangerouslySetInnerHTML={{ __html: description?.toString() ?? '' }} />
      </DialogDescription>

      {/* Artists Section */}
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-6 text-xl font-semibold tracking-tight">Artists</h2>
        <div className="space-y-3">
          {artists && artistsUsernames
            ? artistsUsernames?.map((username) => (
                <div
                  key={username}
                  className="font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  {username}
                </div>
              ))
            : artists?.map((artist) => (
                <div
                  key={artist.id}
                  className="font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  {artist.title}
                </div>
              ))}
        </div>
      </div>

      {/* Styles Section */}
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
    </article>
  )
}
