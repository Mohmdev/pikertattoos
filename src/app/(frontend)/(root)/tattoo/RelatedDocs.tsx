import React from 'react'

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { cn } from '@utils/cn'

import type { Post, Tattoo } from '@payload-types'

import RichText from '@components/RichText'

import { Card } from '../(homepage)/components/Card'

export type RelatedDocsProps = {
  className?: string
  docs?: Tattoo[] | Post[]
  introContent?: SerializedEditorState
}

export const RelatedDocs: React.FC<RelatedDocsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={cn('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-8">
        {docs?.map((doc, index) => {
          if (typeof doc === 'number') return null

          return <Card key={index} doc={doc} showCategories />
        })}
      </div>
    </div>
  )
}
