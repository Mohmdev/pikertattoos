import type { Metadata } from 'next'

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

// import { onGetExploreGroup } from '@/actions/groups'
import { mockGroups } from '@lib/data/mock-data'

import ExplorePageTemplate from './explore-page-template'

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
      <ExplorePageTemplate layout="LIST" category={params.category} />
    </HydrationBoundary>
  )
}

export const metadata: Metadata = {
  title: 'View Tattoo Piece',
  description: 'See this piece in details.'
}
