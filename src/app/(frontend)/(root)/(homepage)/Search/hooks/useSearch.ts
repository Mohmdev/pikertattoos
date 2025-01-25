import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useDebounce } from '@utils/useDebounce'

import type { SearchResults } from '../searchQuery'

import { searchTattoos } from '../searchQuery'

export type { SearchResults }

export interface UseSearchReturn {
  isLoading: boolean
  isError: boolean
  error: Error | null
  data: SearchResults | undefined
  query: string | null
  setSearch: (newQuery: string | null) => void
  searchState: 'idle' | 'loading' | 'error' | 'success'
  prefetchSearch: (query: string) => void
}

export function useSearch(initialQuery?: string, initialData?: SearchResults): UseSearchReturn {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const abortControllerRef = useRef<AbortController | null>(null)
  const isInitialMount = useRef(true)
  const hasHydrated = useRef(false)

  // Initialize with URL param or initial query
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || initialQuery || '')
  const debouncedQuery = useDebounce(searchInput, 300) // 300ms debounce

  // Pre-populate the query cache with initial data if available
  useEffect(() => {
    if (initialData && !hasHydrated.current && debouncedQuery) {
      queryClient.setQueryData(['search', debouncedQuery], initialData)
      hasHydrated.current = true
    }
  }, [initialData, debouncedQuery, queryClient])

  // Sync URL with search state on mount and when URL changes
  useEffect(() => {
    const urlQuery = searchParams.get('q')
    if (urlQuery !== searchInput && !isInitialMount.current) {
      setSearchInput(urlQuery || '')
    }
    isInitialMount.current = false
  }, [searchParams])

  const { isLoading, isError, error, data, isFetching } = useQuery<SearchResults, Error>({
    queryKey: ['search', debouncedQuery],
    queryFn: async ({ signal }) => {
      // Set up cancellation at the hook level
      let isCancelled = false
      signal.addEventListener('abort', () => {
        isCancelled = true
      })

      try {
        const results = await searchTattoos(debouncedQuery || undefined)

        // Check if the request was cancelled
        if (isCancelled) {
          throw new Error('Query was cancelled')
        }

        return results
      } catch (error) {
        if (isCancelled) {
          throw new Error('Query was cancelled')
        }
        throw error
      }
    },
    enabled: !!debouncedQuery && debouncedQuery.length > 0,
    staleTime: 30000, // Results stay fresh for 30s
    gcTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // Don't retry on cancelled queries
      if (error instanceof Error && error.message === 'Query was cancelled') {
        return false
      }
      return failureCount < 1 // Only retry once for other errors
    },
    // Use initial data if available
    initialData,
    // Prevent refetch if we have initial data and haven't hydrated yet
    refetchOnMount: !initialData || hasHydrated.current
  })

  // Prefetch related searches when hovering over categories
  const prefetchSearch = useCallback(
    (query: string) => {
      if (!query) return

      queryClient.prefetchQuery({
        queryKey: ['search', query],
        queryFn: async () => searchTattoos(query),
        staleTime: 30000
      })
    },
    [queryClient]
  )

  const setSearch = useCallback(
    (newQuery: string | null) => {
      // Cancel any pending debounced search
      abortControllerRef.current?.abort()

      setSearchInput(newQuery || '')

      // Only update URL if the query has actually changed
      const currentQuery = searchParams.get('q')
      if (currentQuery === newQuery) return

      const params = new URLSearchParams(searchParams.toString())
      if (newQuery) {
        params.set('q', newQuery)
      } else {
        params.delete('q')
        // Clear the cache when search is cleared
        queryClient.removeQueries({ queryKey: ['search'] })
      }

      // Update URL without full page reload and preserve scroll position
      router.push(`/?${params.toString()}`, { scroll: false })
    },
    [router, searchParams, queryClient]
  )

  // Determine the current search state
  let searchState: 'idle' | 'loading' | 'error' | 'success' = 'idle'
  if (isLoading || isFetching) {
    searchState = 'loading'
  } else if (isError) {
    searchState = 'error'
  } else if (data) {
    searchState = 'success'
  }

  return {
    isLoading: isLoading || isFetching,
    isError,
    error,
    data,
    query: debouncedQuery || null,
    setSearch,
    searchState,
    prefetchSearch
  }
}
