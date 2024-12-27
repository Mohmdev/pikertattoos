import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

// import { onGetExploreGroup } from '@/actions/groups'
import { mockGroups } from '@lib/data/mock-data'

import ExplorePageContent from './explore-content'

const ExploreCategoryPage = async ({ params }: { params: { category: string } }) => {
  const query = new QueryClient()

  await query.prefetchQuery({
    queryKey: ['groups'],
    // queryFn: () => onGetExploreGroup(params.category, 0)
    queryFn: () => Promise.resolve(mockGroups)
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <ExplorePageContent layout="LIST" category={params.category} />
    </HydrationBoundary>
  )
}

export default ExploreCategoryPage
