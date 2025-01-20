import React from 'react'

import { cn } from '@utils/cn'

import { Card, CardDocData } from './Card'

export type Props = {
  docs: CardDocData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { docs } = props

  return (
    <div
      className={cn(
        //
        'max-w-[800px] px-4',
        'mx-auto'
      )}
    >
      <div
        className={cn(
          'grid',
          'grid-cols-4 sm:grid-cols-8 lg:grid-cols-12',
          'gap-x-4 gap-y-4 lg:gap-x-8 lg:gap-y-8 xl:gap-x-8'
        )}
      >
        {docs?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div className="col-span-4" key={index}>
                <Card className="h-full" doc={result} relationTo="tattoo" showCategories />
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
