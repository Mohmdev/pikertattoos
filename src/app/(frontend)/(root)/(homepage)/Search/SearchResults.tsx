import React from 'react'

import { AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@utils/cn'

import type { Search } from '@payload-types'

import { ResultDoc } from './ResultDoc'

type Props = {
  searchQuery?: string
  searchResults: Partial<Search>[] | null
  searchState: 'idle' | 'loading' | 'error' | 'success'
}

export const SearchResults = ({ searchQuery, searchResults, searchState }: Props) => {
  // Only show the component if we have a query
  if (!searchQuery) return null

  return (
    <div className="absolute left-0 top-0 w-full">
      {searchState === 'loading' && (
        <div className="container flex items-center justify-center gap-2 px-4 py-8 text-center">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Searching...</span>
        </div>
      )}

      {searchState === 'error' && (
        <div className="container flex items-center justify-center gap-2 px-4 py-8 text-center text-red-500">
          <AlertCircle className="h-4 w-4" />
          <span>Error searching. Please try again.</span>
        </div>
      )}

      {searchState === 'success' && (
        <>
          {searchResults && searchResults.length > 0 ? (
            <div className={cn('max-w-[800px] px-4', 'mx-auto')}>
              <div
                className={cn(
                  'grid',
                  'grid-cols-4 sm:grid-cols-8 lg:grid-cols-12',
                  'gap-x-4 gap-y-4 lg:gap-x-8 lg:gap-y-8 xl:gap-x-8'
                )}
              >
                {searchResults.map((result, index) => {
                  if (typeof result === 'object' && result !== null) {
                    return <ResultDoc key={index} docData={result} className="col-span-4 h-full" />
                  }
                  return null
                })}
              </div>
            </div>
          ) : (
            <div className="container px-4 py-8 text-center">
              No results found for &quot;{searchQuery}&quot;
            </div>
          )}
        </>
      )}
    </div>
  )
}
