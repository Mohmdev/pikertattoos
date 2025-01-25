'use client'

import React from 'react'

import { cn } from '@utils/cn'

import type { Homepage, Search, Tattoo } from '@payload-types'

import BackdropGradient from '@components/global/backdrop-gradient'
import { TextEffect } from '@ui/text-effect'

import { InView } from './components/in-view'
import { RichStyleHeading } from './components/RichStyleHeading'
import { TriggerCard } from './components/TriggerCard'
import { CategoryListSlider } from './Search/category-list-slider'
import { useSearch } from './Search/hooks/useSearch'
import { SearchErrorBoundary } from './Search/SearchErrorBoundary'
import { SearchInput } from './Search/SearchInput'
import { SearchResults } from './Search/SearchResults'

interface RenderPageProps {
  data: Homepage
  searchResults: Partial<Search>[] | null
  searchQuery?: string
}

const MIN_SEARCH_LENGTH = 3

export const RenderPage = ({
  data,
  searchQuery: initialSearchQuery,
  searchResults
}: RenderPageProps) => {
  const { heading, subheading, gradientBackground, search, gridView } = data

  const featuredPosts =
    gridView?.featuredPosts && gridView?.featuredPosts.length > 0
      ? gridView.featuredPosts.filter(
          (post): post is Tattoo => typeof post === 'object' && post !== null
        )
      : []

  const filterOptions = search?.filterOptions ?? []

  const {
    isLoading,
    data: searchData,
    query,
    setSearch,
    searchState
  } = useSearch(
    initialSearchQuery,
    searchResults ? { docs: searchResults, totalDocs: searchResults.length } : undefined,
    MIN_SEARCH_LENGTH
  )

  return (
    <div
      className={cn(
        'flex flex-1 flex-col',
        'items-center justify-center',
        'gap-2 px-0 pb-10 pt-8 lg:px-2 lg:pt-28',
        'min-h-full max-w-[100vw]'
      )}
    >
      {/* Hero Section */}
      <div className="mb-6 flex flex-col items-center gap-3 md:gap-6">
        <RichStyleHeading
          text={heading?.text}
          highlightedText={heading?.highlightedText}
          withGradientBackground={gradientBackground?.enable ?? false}
          neonColors={{
            firstColor: gradientBackground?.firstColor ?? '#00E6BB',
            secondColor: gradientBackground?.secondColor ?? '#008AE6',
            opacity: (gradientBackground?.opacity ?? 100) / 100
          }}
        />
        {subheading?.text && (
          <TextEffect
            per={subheading?.animateBy ?? 'word'}
            preset={subheading?.animation ?? 'blur'}
            className="leading-none text-themeTextGray"
            delay={subheading?.startDelay ?? 0}
            speedSegment={subheading?.animationSpeed ? subheading.animationSpeed / 100 : 1}
            speedReveal={subheading?.flowSpeed ? subheading.flowSpeed / 100 : 1}
            once={false}
          >
            {subheading?.text ?? ''}
          </TextEffect>
        )}
      </div>

      {/* Search Section */}
      <div
        className={cn(
          'grid',
          'w-full max-w-[650px] px-10 md:px-0',
          'mb-[-100px] mt-[-80px] min-h-[250px]'
        )}
      >
        <SearchErrorBoundary>
          <BackdropGradient
            className="flex h-full flex-col items-center"
            blurClassName={cn('inset-y-0 w-[90%]', 'top-[30%] bottom-[49%]')}
          >
            <SearchInput
              initialValue={query ?? ''}
              onSearch={setSearch}
              placeholder={search?.placeholderText ?? 'Search for anything'}
              glass
              className="my-auto"
              iconClassName="text-themeTextGray"
              isLoading={isLoading}
            />
          </BackdropGradient>
        </SearchErrorBoundary>
      </div>

      {/* Search Categories */}
      {search?.enableFilters && (
        <div className="w-full max-w-[800px] overflow-hidden px-0 md:px-0">
          <SearchErrorBoundary>
            <CategoryListSlider
              overlay
              route
              categories={filterOptions}
              onSearch={setSearch}
              isLoading={isLoading}
              selectedQuery={query}
            />
          </SearchErrorBoundary>
        </div>
      )}

      {/* Dynamic Content Section */}
      <div className="relative w-full">
        <SearchErrorBoundary>
          <SearchResults
            searchQuery={query ?? undefined}
            searchResults={searchData?.docs ?? null}
            searchState={searchState}
          />
        </SearchErrorBoundary>

        {/* Default Grid View */}
        <div
          className={cn(
            'relative transition-all duration-300',
            // Only hide when we have a valid search (3+ chars)
            (query?.length ?? 0) >= MIN_SEARCH_LENGTH
              ? 'pointer-events-none opacity-0'
              : 'pointer-events-auto opacity-100'
          )}
        >
          <div
            className={cn('relative flex w-full flex-col items-center overflow-hidden')}
            style={{
              maskImage: `linear-gradient(to right,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.6) 40%,rgba(0, 0, 0, 0.6) 60%,rgba(0, 0, 0, 0))`
            }}
          >
            <div
              className={cn(
                'overflow-auto',
                'h-max max-w-[1920px]',
                'flex items-end justify-center pb-12'
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
                <div className="w-full columns-2 gap-2 sm:columns-3 md:gap-3">
                  {featuredPosts.map((post) => (
                    <TriggerCard enableLink key={post.id} doc={post} className="mb-2 md:mb-3" />
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
