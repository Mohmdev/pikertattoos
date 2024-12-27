import type { Metadata } from 'next'

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

// import { onGetExploreGroup } from '@/actions/groups'
import { mockGroups } from '@lib/data/mock-data'

import ExplorePageContent from './explore-content'

type Props = {
  params: {
    category: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ExploreCategoryPage({ params }: Props) {
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

export const metadata: Metadata = {
  title: 'Explore Groups',
  description: 'Explore different groups'
}
