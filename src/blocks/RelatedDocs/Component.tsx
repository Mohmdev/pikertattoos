import RichText from '@components/RichText'
import { Card } from '@components/dynamic/Card'
import type { RELATABLE_COLLECTIONS_TYPES } from '@constants/featureFlags'
import type { Post, Tattoo } from '@payload-types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { cn } from '@utils/cn'
import React from 'react'

export type RelatedDocsProps = {
  className?: string
  docs?: Post['relatedDocs']
  introContent?: SerializedEditorState
}

export const RelatedDocs: React.FC<RelatedDocsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={cn('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          const docData = typeof doc.value === 'object' ? doc.value : null
          if (!docData) return null

          return (
            <Card
              key={index}
              doc={docData}
              relationTo={doc.relationTo}
              showCategories
            />
          )
        })}
      </div>
    </div>
  )
}
