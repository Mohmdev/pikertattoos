import type { GroupStateProps } from '@lib/data/types'

// Infinite Scroll needs to be replaced with payload data fetching
import InfiniteScrollObserver from '@components/global/infinite-scroll'
import { Loader } from '@components/global/loader'
import { NoResult } from '@components/global/search/no-results'

import { ItemCard } from './item-card'
import { PaginatedItems } from './paginated-items'

type Props = {
  searching: boolean
  data: GroupStateProps[]
  query?: string
}

export const SearchItems = ({ data, searching, query }: Props) => {
  return (
    <div className="container mt-36 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Loader loading={searching} className="md:col-span-2 lg:col-span-3">
        {data.length > 0 ? (
          data.map((group: GroupStateProps) => <ItemCard key={group.id} {...group} />)
        ) : (
          <NoResult />
        )}
      </Loader>
      {data.length > 5 && (
        <InfiniteScrollObserver
          action="GROUPS"
          identifier={query as string}
          paginate={data.length}
          search
        >
          <PaginatedItems />
        </InfiniteScrollObserver>
      )}
    </div>
  )
}
