'use client'

// Payload will be called here instead of redux store
// import { useAppSelector } from "@/redux/store"
import dynamic from 'next/dynamic'

import { ItemsList } from './items-list'
import { ItemsSlider } from './items-slider'

type Props = {
  layout: 'SLIDER' | 'LIST'
  category?: string
}

const SearchItems = dynamic(
  () => import('./search-items').then((components) => components.SearchItems),
  {
    ssr: false
  }
)

const ExplorePageTemplate = ({ layout, category }: Props) => {
  // Mock search state that will later come from Redux
  const mockSearchState = {
    isSearching: false,
    data: [],
    status: 404, // Set to 404 to show content instead of search
    debounce: ''
  }

  const { isSearching, data, status, debounce } = mockSearchState
  // const { isSearching, data, status, debounce }

  return (
    <div className="flex flex-col">
      {isSearching || debounce ? (
        <SearchItems searching={isSearching as boolean} data={data!} query={debounce} />
      ) : (
        status !== 200 &&
        (layout === 'SLIDER' ? (
          <>
            <ItemsSlider
              label="Hand & Wrist"
              text="Delicate designs for your hands and wrists, from minimalist symbols to intricate patterns"
              query="hand-wrist"
            />
            <ItemsSlider
              label="Arms & Shoulders"
              text="From sleeves to single pieces, discover designs that flow with your natural contours"
              query="arms-shoulders"
            />
            <ItemsSlider
              label="Body Art"
              text="Back, chest and torso designs ranging from subtle to statement pieces"
              query="body"
            />
            <ItemsSlider
              label="Cover Ups"
              text="Transform existing tattoos into new masterpieces with our cover-up expertise"
              query="cover-up"
            />
            <ItemsSlider
              label="Connected Pieces"
              text="Multi-session artwork that tells your story across different body areas"
              query="connected-pieces"
            />
            <ItemsSlider
              label="Small & Minimal"
              text="Subtle, meaningful pieces perfect for first-timers or minimalist enthusiasts"
              query="small-minimal"
            />
          </>
        ) : (
          <ItemsList category={category as string} />
        ))
      )}
    </div>
  )
}

export default ExplorePageTemplate
