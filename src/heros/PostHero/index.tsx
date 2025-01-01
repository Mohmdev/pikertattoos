import React from 'react'

import { formatAuthors } from '@utils/formatAuthors'
import { formatDateTime } from '@utils/formatDateTime'

import type { Post } from '@payload-types'

import { Media } from '@components/dynamic/Media'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, authors, publishedAt, title } = post

  const hasAuthors = authors && authors.length > 0 && formatAuthors(authors) !== ''

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="container relative z-10 pb-8 text-white lg:grid lg:grid-cols-[1fr_48rem_1fr]">
        <div className="col-span-1 col-start-1 md:col-span-2 md:col-start-2">
          <div className="mb-6 text-sm uppercase">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { value } = category
                const categoryTitle =
                  typeof value === 'object' && value !== null ? value.title : 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {categoryTitle}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:gap-16">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>

                  <p>{formatAuthors(authors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
        )}
        <div className="bg-gradient-to-t pointer-events-none absolute bottom-0 left-0 h-1/2 w-full from-black to-transparent" />
      </div>
    </div>
  )
}