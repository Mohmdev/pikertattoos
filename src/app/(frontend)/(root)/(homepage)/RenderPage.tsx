'use client'

import React, { useEffect, useState } from 'react'

import { cn } from '@utils/cn'

import type { Homepage, Tattoo } from '@payload-types'

import BackdropGradient from '@components/global/backdrop-gradient'
import { CategoryListSlider } from '@components/global/category-list-slider'
import GradientText from '@components/global/gradient-text'

import { CardDocData } from '../tattoos/Card'
import { CollectionArchive } from '../tattoos/CollectionArchive'
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

  console.log('RenderPage - initialDocs:', initialDocs)
  console.log('RenderPage - searchResults:', searchResults)

  return (
    <div
      className={cn(
        //
        'flex flex-1 flex-col',
        'items-center justify-center',
        'my-10 gap-10 px-0 xl:px-10',
        'min-h-screen'
      )}
    >
      <div className="mt-10 flex flex-col items-center gap-2">
        <BackdropGradient
          className={cn(
            'm-0 size-full'
            // 'h-3/6 xl:h-2/6'
            // 'h-3/6 w-4/12 md:w-5/12 xl:h-2/6 xl:w-3/12'
          )}
          container="items-center"
        >
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
            // searchType="GROUPS"
            placeholder="Search for anything"
            inputClassName="lg:w-[500px] text-lg h-auto z-[9999]"
            className="mb-3 mt-10 rounded-3xl border-themeGray px-5 py-2"
            initialValue={searchQuery}
            onResultsChange={setSearchResults}
          />
          <div className="w-full md:w-[800px]">
            <CategoryListSlider overlay route />
          </div>
        </BackdropGradient>

        {searchQuery ? (
          searchResults ? (
            <CollectionArchive docs={searchResults} />
          ) : (
            <div className="container">No results found for &quot;{searchQuery}&quot;</div>
          )
        ) : null}
      </div>

      <div
        className={cn('relative flex w-max max-w-full flex-col items-center overflow-x-hidden')}
        style={{
          maskImage: `linear-gradient(to right,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.6) 40%,rgba(0, 0, 0, 0.6) 60%,rgba(0, 0, 0, 0))`
        }}
      >
        <InViewImagesGrid data={tattoos} />
      </div>
    </div>
  )
}
