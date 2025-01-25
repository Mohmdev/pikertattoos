---
description:
globs:
---

# Issues Summary

1. Infinite request loop
2. State management conflicts
3. Client-server synchronization problems
4. Multiple search triggers

# Component Responsibility Analysis

```
page.tsx (Server Component)@page.tsx
├── RenderPage.tsx (Client Component - Search State Manager) @RenderPage.tsx
│   ├── SearchInput.tsx (Search Bar) @SearchInput.tsx
│   ├── CategoryListSlider/index.tsx (Filter Categories)@index.tsx
│   │   └── CategoryButton.tsx (Individual Filter) @category-button.tsx
│   └── SearchResults.tsx (Results Display) @SearchResults.tsx
│       └── ResultDoc.tsx (Individual Result) @ResultDoc.tsx
└── searchTattoos (Database Query) @searchQuery.ts
```

1. Server Layer (page.tsx)

   - Current: Handles initial search and passes data
   - Problem: Gets called repeatedly due to client-side state changes
   - Should: Only perform initial server-side search based on URL params
   - Should: Not re-render for client-side state changes

2. State Management @RenderPage.tsx

   - Current: Central state manager but might be causing cascading updates
   - Problem: Might be propagating unnecessary state updates
   - Should: Be the single source of truth for search state
   - Should: Control when server requests happen

3. Search Input @SearchInput.tsx

   - Current: Handles input, debouncing, and URL updates
   - Problem: URL updates causing page reloads
   - Should: Only update URL after successful search
   - Should: Better handle initialization state

4. Category Management @CategoryListSlider

   - Current: Independent search triggering
   - Problem: Might conflict with text search
   - Should: Work through the central state manager
   - Should: Share the same search flow as text input

5. Database Query @searchQuery.ts

# Things that need to be considred

1. State Management Optimization:

   - Implement a proper state machine for search states
   - Define clear state transitions
   - Single source of truth for search state

2. Search Flow Control:

   - Client-side search state
   - Server-side search execution
   - URL synchronization
   - Results caching

3. Performance Optimization:
   - Debounce all search triggers
   - Prevent unnecessary re-renders
   - Cache results where appropriate

# Search Implementation Plans

## Plan A: Manually handling all the search logic and state management

### Phase 1: Search State Management Centralization

1. Create a proper state machine in RenderPage.tsx

- Define clear search states: IDLE, LOADING, SUCCESS, ERROR
- Single source of truth for search query, results, and loading state
- Prevent redundant state updates

2. Implement proper initialization handling

- Handle initial server-side state
- Prevent unnecessary initial searches
- Control when client-side searches begin

### Phase 2: Search Flow Optimization

1. Optimize search trigger points

   - Consolidate search triggers from SearchInput and CategoryListSlider
   - Implement proper debouncing strategy
   - Handle URL updates without causing full page reloads

2. Implement proper client-server synchronization
   - Control when server requests happen
   - Handle URL updates without triggering unnecessary server calls
3. Cache results to prevent redundant searches

### Phase 3: Component Communication

1. Establish clear data flow
   - SearchInput → RenderPage → SearchResults
   - CategoryListSlider → RenderPage → SearchResults
   - Prevent components from triggering searches independently
2. Implement proper prop drilling
   - Pass only necessary props
   - Use callbacks efficiently
     Prevent unnecessary re-renders

### Success Metrics:

1. No unnecessary server requests
2. Smooth URL updates without page reloads
3. Consistent search experience across text and category searches
4. No duplicate searches for the same query

## Plan B: Using React Query to handle the search logic and state management

- Handles loading, error, and success states automatically
- Manages cache invalidation
- Built-in request deduplication

### Success Metrics:

1. No unnecessary server requests
2. Smooth URL updates without page reloads
3. Consistent search experience across text and category searches
4. No duplicate searches for the same query
5. Perfect for Our Search Flow

```ts
// Example structure with React Query
const useSearch = (query: string | null) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const payload = await getPayload({ config: configPromise });
      return searchTattoos(payload, query ?? undefined);
    },
    // Key features we get:
    enabled: !!query && query.length > 0, // Only run when we have a query
    staleTime: 30000, // Results stay fresh for 30s
    cacheTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false, // Prevent refetch on window focus
  });
};
```

6. Solves Our Current Issues

   - State Management: Built-in states (isLoading, isError, data)
   - Caching: Prevents unnecessary requests
   - Race Conditions: Handled automatically
   - Initialization: Better control through enabled option

7. Keeps Our Backend Layer Clean

   - We keep your existing `searchTattoos` function unchanged
   - Only changes how we manage the data fetching and state

In summary, React Query would significantly simplify our state management while solving our performance issues.

## How to integrate React Query into our current architecture

1. Create a Search Hook Layer

```ts
// src/app/(frontend)/(root)/(homepage)/Search/hooks/useSearch.ts
import { useQuery } from '@tanstack/react-query'
import { getPayload } from 'payload'
import { searchTattoos } from '../searchQuery'

export function useSearch(query: string | null) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      const payload = await getPayload({ config: configPromise })
      return searchTattoos(payload, query ?? undefined)
    },
    enabled: !!query,
    staleTime: 30000,
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}
```

2. Simplify RenderPage.tsx

   - Remove complex state management
   - Use React Query for search state
   - Handle only UI state (if any)

3. Update Component Communication

```ts
// Flow would become:
SearchInput/CategoryListSlider
  → URL state (query parameter)
  → useSearch hook (React Query)
  → SearchResults
```

4. URL Synchronization
   - Use Next.js's useSearchParams for reading
   - Use router.push with { scroll: false } for updates
   - Let React Query handle the actual data fetching

# Conclusion

Breaking down the problem systemically and then implementing a solution is the best way to fix the issue.

1. State Management is scattered across components with potential race conditions
2. Multiple search triggers happening from both SearchInput and CategoryListSlider
3. URL synchronization causing unnecessary server reloads
4. Initialization issues causing potential infinite loops
5. No proper caching strategy
6. Redundant server requests
