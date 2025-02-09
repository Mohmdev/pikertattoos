'use client'

import Link from 'next/link'
import React, { Fragment } from 'react'

import useClickableCard from '@hooks/useClickableCard'
import { cn } from '@utils/cn'

import type { Post } from '@payload-types'
import type { RELATABLE_COLLECTIONS_TYPES } from '@services/control-board'

import { Media } from '@components/dynamic/Media'

export type CardPostData = Pick<Post, 'slug' | 'meta' | 'title'> & {
  categories?: Post['categories'] // Make categories optional since it only exists for Posts
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: RELATABLE_COLLECTIONS_TYPES
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const {
    className,
    doc,
    relationTo,
    showCategories,
    title: titleFromProps,
  } = props

  const { slug, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories =
    doc?.categories &&
    Array.isArray(doc.categories) &&
    doc.categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'overflow-hidden rounded-lg border border-border bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media resource={metaImage} sizes="33vw" />
        )}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && relationTo === 'posts' && (
          <div className="mb-4 text-sm uppercase">
            <div>
              {doc?.categories?.map((category, index) => {
                if (typeof category === 'object' && 'value' in category) {
                  const { value } = category
                  const categoryTitle =
                    typeof value === 'object'
                      ? value.title
                      : 'Untitled category'

                  const isLast = index === doc.categories!.length - 1

                  return (
                    <Fragment key={index}>
                      {categoryTitle}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  )
                }
                return null
              })}
            </div>
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && (
          <div className="mt-2">
            {description && <p>{sanitizedDescription}</p>}
          </div>
        )}
      </div>
    </article>
  )
}
