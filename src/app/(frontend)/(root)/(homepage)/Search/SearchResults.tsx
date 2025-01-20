import React from 'react'

import { cn } from '@utils/cn'

import { Card, CardDocData } from '../components/Card'

type Props = {
  searchQuery?: string
  searchResults: CardDocData[] | null
}

export const SearchResults = ({ searchQuery, searchResults }: Props) => {
  return (
    <div
      className={cn(
        'absolute left-0 top-0 w-full transition-all duration-300',
        searchQuery ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      {searchResults ? (
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
            {searchResults?.map((result, index) => {
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
      ) : (
        <div className="container px-4 text-center">
          No results found for &quot;{searchQuery}&quot;
        </div>
      )}
    </div>
  )
}
