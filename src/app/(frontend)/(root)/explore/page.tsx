// import { onGetExploreGroup } from "@/actions/groups"
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { mockParentCategoriesQuery } from '@lib/tattoo/parent-categories'

import ExplorePageTemplate from './[category]/explore-page-template'

export default async function ExplorePage() {
  const query = new QueryClient()

  await query.prefetchQuery({
    queryKey: ['full-body'],
    // queryFn: () => onGetExploreGroup('fitness', 0)
    queryFn: () => Promise.resolve(mockParentCategoriesQuery.fullBody)
  })

  await query.prefetchQuery({
    queryKey: ['upper-body'],
    // queryFn: () => onGetExploreGroup('music', 0)
    queryFn: () => Promise.resolve(mockParentCategoriesQuery.upperBody)
  })

  await query.prefetchQuery({
    queryKey: ['lower-body'],
    // queryFn: () => onGetExploreGroup('lifestyle', 0)
    queryFn: () => Promise.resolve(mockParentCategoriesQuery.lowerBody)
  })

  await query.prefetchQuery({
    queryKey: ['sensitive-areas'],
    // queryFn: () => onGetExploreGroup('lifestyle', 0)
    queryFn: () => Promise.resolve(mockParentCategoriesQuery.sensetiveAreas)
  })

  await query.prefetchQuery({
    queryKey: ['cover-ups'],
    // queryFn: () => onGetExploreGroup('lifestyle', 0)
    queryFn: () => Promise.resolve(mockParentCategoriesQuery.coverUps)
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <ExplorePageTemplate layout="SLIDER" />
    </HydrationBoundary>
  )
}
