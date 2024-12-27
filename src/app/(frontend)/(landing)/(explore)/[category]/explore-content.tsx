'use client'

// Payload will be called here instead of redux store
// import { useAppSelector } from "@/redux/store"
import dynamic from 'next/dynamic'

import ExploreSlider from './explore-slider'
import GroupList from './group-list'

type Props = {
  layout: 'SLIDER' | 'LIST'
  category?: string
}

const SearchGroups = dynamic(
  () => import('./searched-groups').then((components) => components.SearchGroups),
  {
    ssr: false
  }
)

const ExplorePageContent = ({ layout, category }: Props) => {
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
        <SearchGroups searching={isSearching as boolean} data={data!} query={debounce} />
      ) : (
        status !== 200 &&
        (layout === 'SLIDER' ? (
          <>
            <ExploreSlider
              label="Fitness"
              text="Join top performing groups on grouple."
              query="fitness"
            />
            <ExploreSlider
              label="Lifestyle"
              text="Join top performing groups on grouple."
              query="lifestyle"
            />
            <ExploreSlider
              label="Music"
              text="Join top performing groups on grouple."
              query="music"
            />
          </>
        ) : (
          <GroupList category={category as string} />
        ))
      )}
    </div>
  )
}

export default ExplorePageContent
