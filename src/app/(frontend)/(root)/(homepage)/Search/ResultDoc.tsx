'use client'

import React, { memo } from 'react'
import Link from 'next/link'

import { cn } from '@utils/cn'
import useClickableCard from '@hooks/useClickableCard'

import type { Search } from '@payload-types'

import { Media } from '@components/dynamic/Media'

export const ResultDoc = memo(
  ({
    className,
    docData,
    displayTitle = true,
    displayCategories = true
  }: {
    className?: string
    docData?: Partial<Search>
    relationTo?: string
    displayTitle?: boolean
    displayCategories?: boolean
  }) => {
    const { card, link } = useClickableCard({})
    const { title, slug, image, styles, doc } = docData || {}

    const categories = { styles }
    const relatedCollection = doc!.relationTo as string
    const hasCategories = categories && Object.keys(categories).length > 0
    const categoryToUse = categories.styles
    const href = `/${relatedCollection}/${slug}`

    return (
      <article
        className={cn(
          'overflow-hidden rounded-lg border border-border bg-card hover:cursor-pointer',
          className
        )}
        ref={card.ref}
      >
        <div className="relative w-full">
          {!image && (
            <div className="grid aspect-square place-items-center bg-muted text-muted-foreground">
              No image
            </div>
          )}
          {image && typeof image !== 'number' && <Media resource={image} sizes="33vw" />}
        </div>
        <div className="p-4">
          {displayTitle && title && (
            <div className="prose">
              <h3>{title}</h3>
              <Link className="hidden" href={href} ref={link.ref} />
            </div>
          )}
          {displayCategories && hasCategories && (
            <div className="mb-4 text-sm capitalize">
              {categoryToUse?.map((style, index) => {
                return <div key={index}>{style.title}</div>
              })}
            </div>
          )}
        </div>
      </article>
    )
  }
)

ResultDoc.displayName = 'ResultDoc'
