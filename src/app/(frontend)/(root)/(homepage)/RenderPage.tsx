'use client'

import React, { useEffect, useState } from 'react'

import { cn } from '@utils/cn'

import type { Homepage, Tattoo } from '@payload-types'

import BackdropGradient from '@components/global/backdrop-gradient'
import { CategoryListSlider } from '@components/global/category-list-slider'
import GradientText from '@components/global/gradient-text'

import { CardDocData } from './components/Card'
import { CollectionArchive } from './components/CollectionArchive'
import { InView } from './components/in-view'
import { TriggerCard } from './components/TriggerCard'
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
        'gap-2 px-0 pb-10 pt-14 lg:pt-36 xl:px-10',
        'min-h-screen max-w-[100vw]'
      )}
    >
      {/* Hero Section */}
      <div className="mb-6 flex flex-col items-center gap-3">
        <GradientText
          className="text-center text-[40px] font-semibold leading-none md:text-[55px] lg:text-[90px]"
          element="H1"
        >
          {title ? title : 'Nexweb Studio'}
        </GradientText>
        <p className="my-0 leading-none text-themeTextGray">
          {subtitle ? subtitle : 'Web Technology Solutions'}
        </p>
      </div>

      {/* Search Section */}
      <div
        className={cn(
          //
          'grid',
          'w-full max-w-[550px] px-10 md:px-0',
          'mb-[-100px] mt-[-80px] min-h-[250px]'
        )}
      >
        <BackdropGradient
          className="flex h-full flex-col items-center"
          blurClassName={cn(
            //
            'inset-y-0 w-[90%]',
            'top-[30%] bottom-[46%]'
          )}
        >
          <Search
            initialValue={searchQuery}
            onResultsChange={setSearchResults}
            placeholder="Search for anything"
            glass
            className={cn(
              //
              'my-auto w-[95%]',
              'flex rounded-3xl border-themeGray px-5 py-2'
            )}
            inputClassName="w-full flex-1 text-md lg:text-lg h-[30px] lg:h-[36px]"
            iconClassName="text-themeTextGray"
            iconSize={21}
            // searchType="GROUPS"
          />
        </BackdropGradient>
      </div>
      <div className="w-full max-w-[800px] overflow-hidden px-4 md:px-0">
        <CategoryListSlider overlay route />
      </div>

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
            <div
              className={cn(
                'overflow-auto',
                'h-max max-w-[1920px]',
                'flex items-end justify-center px-2 pb-12 md:px-4'
              )}
            >
              <InView
                viewOptions={{ once: true, margin: '0px 0px -250px 0px' }}
                variants={{
                  hidden: {
                    opacity: 0
                  },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.09
                    }
                  }
                }}
              >
                <div className="w-full columns-2 sm:columns-3">
                  {tattoos.map((tattoo) => (
                    <TriggerCard enableLink key={tattoo.id} doc={tattoo} className="mb-4" />
                  ))}
                </div>
              </InView>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
