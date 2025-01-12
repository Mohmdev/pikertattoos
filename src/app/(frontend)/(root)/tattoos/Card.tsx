'use client'

import React, { Fragment } from 'react'
import Link from 'next/link'

import { cn } from '@utils/cn'

import type { Search, Tattoo } from '@payload-types'

import { Media } from '@components/dynamic/Media'

import useClickableCard from './useClickableCard'

// export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>
// export type CardDocData = Pick<Tattoo, 'slug' | 'style' | 'title'  > & { image?: (number | null) | Media;}
export type CardDocData = Pick<Search, 'slug' | 'title' | 'image' | 'description'> &
  Exclude<Tattoo, 'style'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardDocData
  relationTo?: 'tattoo' //
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { title, slug, style: styles, image } = doc || {}

  const hasStyles = styles && Array.isArray(styles) && styles.length > 0

  const titleToUse = titleFromProps || title
  // const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'overflow-hidden rounded-lg border border-border bg-card hover:cursor-pointer',
        className
      )}
      ref={card.ref}
    >
      <div className="relative w-full">
        {!image && <div className="">No image</div>}
        {image && typeof image !== 'number' && <Media resource={image} sizes="33vw" />}
      </div>
      <div className="p-4">
        {showCategories && hasStyles && (
          <div className="mb-4 text-sm uppercase">
            {showCategories && hasStyles && (
              <div>
                {styles?.map((style, index) => {
                  if (typeof style === 'object') {
                    const { title: titleFromCategory } = style

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === styles.length - 1

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
            )}
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
        {/* {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>} */}
      </div>
    </article>
  )
}
