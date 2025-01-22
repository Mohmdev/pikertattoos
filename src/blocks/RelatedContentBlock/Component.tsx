import React from 'react'

import { cn } from '@utils/cn'

import type { Post } from '@payload-types'

import { Card } from '@components/dynamic/Card'
import RichText from '@components/RichText'

export type RelatedContentBlockProps = {
  className?: string
  docs?: Post[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  introContent?: any
}

export const RelatedContentBlock: React.FC<RelatedContentBlockProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={cn('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-8">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <Card key={index} doc={doc} relationTo="posts" showCategories />
        })}
      </div>
    </div>
  )
}
