# Search Component Overview

## Component Hierarchy

```
page.tsx (Server Component)
└── RenderPage.tsx (Client Component - Search State Manager)
    ├── SearchInput.tsx (Search Bar)
    ├── CategoryListSlider/index.tsx (Filter Categories)
    │   └── CategoryButton.tsx (Individual Filter)
    └── SearchResults.tsx (Results Display)
        └── ResultDoc.tsx (Individual Result)
```

## Data Flow & State Management

1. **page.tsx (Server)**

   - Handles initial server-side search
   - Passes initial search results and query to RenderPage
   - Performs database queries via `searchTattoos` function

2. **RenderPage.tsx (Client - State Manager)**

   - Centralizes search state management via `searchState`:
     ```typescript
     interface SearchState {
       isLoading: boolean
       query: string | null
       results: Partial<Search>[] | null
     }
     ```
   - Provides state handlers:
     - `handleSearch`: Updates query and sets loading state
     - `handleSearchComplete`: Updates results and clears loading state
   - Distributes state and handlers to child components

3. **SearchInput.tsx**

   - Handles user text input with debouncing
   - Uses initialization protection to prevent initial search triggers
   - Updates URL with search parameters
   - Shows loading state in search icon

4. **CategoryListSlider/index.tsx**

   - Provides category-based filtering
   - Updates URL with selected category
   - Shares the same search flow as text search
   - Shows loading state in buttons

5. **SearchResults.tsx**
   - Displays search results or loading state
   - Conditionally renders based on search state:
     - Loading indicator
     - Search results grid
     - No results message

## Search Flow

1. **Initial Load**

   - Server performs initial search if URL has query
   - Results passed down through component tree
   - Components initialize with provided data

2. **User Search**

   - User types in SearchInput or clicks CategoryButton
   - Debounced search trigger (SearchInput only)
   - URL updates with search parameters
   - Loading state shows across components
   - Results update when search completes

3. **State Updates**
   - All state changes managed by RenderPage
   - Loading indicators synchronized across components
   - Results propagate down from central state

## Loading State Handling

- Centralized in RenderPage's searchState
- Propagates to all child components:
  - SearchInput: Spinning search icon
  - CategoryButton: Disabled state + opacity
  - SearchResults: Loading message
  - URL updates managed by individual components but coordinated through central state

## Key Features

- Debounced search input
- URL-synchronized search state
- Centralized state management
- Consistent loading indicators
- Category-based filtering
- Responsive grid layout for results
- Fallback states for no results/loading
