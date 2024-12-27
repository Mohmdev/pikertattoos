// import { onGetExploreGroup } from "@/actions/groups"
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import ExplorePageContent from './[category]/explore-content'

export default async function ExplorePage() {
  const query = new QueryClient()

  await query.prefetchQuery({
    queryKey: ['fitness'],
    // queryFn: () => onGetExploreGroup('fitness', 0)
    queryFn: () => Promise.resolve(mockCategoryGroups.fitness)
  })

  await query.prefetchQuery({
    queryKey: ['music'],
    // queryFn: () => onGetExploreGroup('music', 0)
    queryFn: () => Promise.resolve(mockCategoryGroups.music)
  })

  await query.prefetchQuery({
    queryKey: ['lifestyle'],
    // queryFn: () => onGetExploreGroup('lifestyle', 0)
    queryFn: () => Promise.resolve(mockCategoryGroups.lifestyle)
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <ExplorePageContent layout="SLIDER" />
    </HydrationBoundary>
  )
}

// Mock data

export const mockCategoryGroups = {
  fitness: {
    status: 200,
    groups: [
      {
        id: 'fitness-1',
        name: 'NYC Fitness Club',
        category: 'fitness',
        createdAt: new Date(),
        htmlDescription: null,
        userId: 'user-1',
        thumbnail: 'https://picsum.photos/200/300',
        description: 'Fitness enthusiasts in NYC',
        privacy: 'PUBLIC',
        jsonDescription: null,
        gallery: ['https://picsum.photos/200/300']
      }
    ]
  },
  music: {
    status: 200,
    groups: [
      {
        id: 'music-1',
        name: 'Musicians Network',
        category: 'music',
        createdAt: new Date(),
        htmlDescription: null,
        userId: 'user-2',
        thumbnail: 'https://picsum.photos/200/300',
        description: 'Musicians community',
        privacy: 'PUBLIC',
        jsonDescription: null,
        gallery: ['https://picsum.photos/200/300']
      }
    ]
  },
  lifestyle: {
    status: 200,
    groups: [
      {
        id: 'lifestyle-1',
        name: 'Healthy Living',
        category: 'lifestyle',
        createdAt: new Date(),
        htmlDescription: null,
        userId: 'user-3',
        thumbnail: 'https://picsum.photos/200/300',
        description: 'Lifestyle community',
        privacy: 'PUBLIC',
        jsonDescription: null,
        gallery: ['https://picsum.photos/200/300']
      }
    ]
  }
}
