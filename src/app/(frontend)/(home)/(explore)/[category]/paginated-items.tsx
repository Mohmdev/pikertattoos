// import { useAppSelector } from '@lib/data/mock-redux-store'
import { mockInfiniteScrollState } from '@lib/data/mock-data'

import type { GroupStateProps } from '@lib/data/types'

import { ItemCard } from './item-card'

export const PaginatedItems = () => {
  // Mock selector
  const { data } = mockInfiniteScrollState
  // const { data } = useAppSelector((state) => state.infiniteScrollReducer)

  return (
    <>
      {data.map((item: GroupStateProps) => (
        <ItemCard key={item.id} {...item} />
      ))}
    </>
  )
}
