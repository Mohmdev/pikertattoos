// TODO: Not sure about this component. Needs investigation.

// import { useGroupList } from '@hooks/groups'

import { mockTattooItems } from '@lib/tattoo/mock-tattoos'
import InfiniteScrollObserver from '@/components/global/infinite-scroll'
import { NoResult } from '@/components/global/search/no-results'

import { ItemCard } from './item-card'
import { PaginatedItems } from './paginated-items'

type Props = {
  category: string
}

export const ItemsList = ({ category }: Props) => {
  // const { groups, status } = useGroupList('groups')
  const { groups, status } = {
    groups: mockTattooItems,
    status: 200
  }

  return (
    <div className="container mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {status === 200 ? (
        groups.map((group) => <ItemCard key={group.id} {...group} />)
      ) : (
        <NoResult />
      )}
      {groups && groups.length > 5 && (
        <InfiniteScrollObserver action="GROUPS" identifier={category} paginate={groups.length}>
          <PaginatedItems />
        </InfiniteScrollObserver>
      )}
    </div>
  )
}
