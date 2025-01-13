'use client'

import React, { useEffect, useState } from 'react'

import { cn } from '@utils/cn'

import type { Homepage, Tattoo } from '@payload-types'

import BackdropGradient from '@components/global/backdrop-gradient'
import { CategoryListSlider } from '@components/global/category-list-slider'
import GradientText from '@components/global/gradient-text'

import { CardDocData } from './components/Card'
import { CollectionArchive } from './components/CollectionArchive'
import { InViewImagesGrid } from './components/InViewImagesGrid'
import { Search } from './Search'

interface RenderPageProps {
  data: Homepage
  docs: CardDocData[] | null
  searchQuery?: string
}
export const RenderPage = ({ data, docs: initialDocs, searchQuery }: RenderPageProps) => {
  const [searchResults, setSearchResults] = useState<CardDocData[] | null>(initialDocs)
  const { title, subtitle, featured } = data
  const tattoos = featured as Tattoo[]

  useEffect(() => {
    setSearchResults(initialDocs)
  }, [initialDocs])

  return (
    <div
      className={cn(
        'flex flex-1 flex-col',
        'items-center justify-center',
        'my-10 gap-10 px-0 xl:px-10',
        'min-h-screen max-w-[100vw]'
      )}
    >
      <div className="mt-10 flex flex-col items-center gap-2">
        <BackdropGradient className={cn('m-0 size-full')} container="items-center">
          <GradientText
            className="text-center text-[40px] font-semibold leading-none md:text-[55px] lg:text-[90px]"
            element="H1"
          >
            {title ? title : 'Nexweb Studio'}
          </GradientText>
          <p className="pt-2 leading-none text-themeTextGray">
            {subtitle ? subtitle : 'Web Technology Solutions'}
          </p>
        </BackdropGradient>

        <BackdropGradient
          className="h-3/6 w-4/12 md:w-5/12 xl:h-2/6 xl:w-3/12"
          container="items-center"
        >
          <Search
            glass
            placeholder="Search for anything"
            inputClassName="w-full max-w-[500px] text-lg h-auto"
            className="mb-3 mt-10 rounded-3xl border-themeGray px-5 py-2"
            initialValue={searchQuery}
            onResultsChange={setSearchResults}
            // searchType="GROUPS"
          />
          <div className="w-full max-w-[800px] overflow-hidden px-4 md:px-0">
            <CategoryListSlider overlay route />
          </div>
        </BackdropGradient>

        {/* Dynamic Content Section */}
        <div className="relative w-full">
          {/* Search Results */}
          <div
            className={cn(
              'absolute left-0 top-0 w-full transition-all duration-300',
              searchQuery ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
            )}
          >
            {searchResults ? (
              <CollectionArchive docs={searchResults} />
            ) : (
              <div className="container px-4">No results found for &quot;{searchQuery}&quot;</div>
            )}
          </div>

          {/* Default Grid View */}
          <div
            className={cn(
              'relative transition-all duration-300',
              searchQuery ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
            )}
          >
            <div
              className={cn(
                'relative flex w-full flex-col items-center overflow-hidden px-4 md:px-0'
              )}
              style={{
                maskImage: `linear-gradient(to right,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.6) 40%,rgba(0, 0, 0, 0.6) 60%,rgba(0, 0, 0, 0))`
              }}
            >
              <InViewImagesGrid data={tattoos} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
