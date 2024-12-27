// import { useAppSelector } from '@lib/data/mock-redux-store'
import { mockInfiniteScrollState } from '@lib/data/mock-data'

import type { GroupStateProps } from '@lib/data/types'

import GroupCard from './group-card'

const PaginatedGroups = () => {
  // Mock selector
  const { data } = mockInfiniteScrollState
  // const { data } = useAppSelector((state) => state.infiniteScrollReducer)

  return (
    <>
      {data.map((item: GroupStateProps) => (
        <GroupCard key={item.id} {...item} />
      ))}
    </>
  )
}

export default PaginatedGroups
