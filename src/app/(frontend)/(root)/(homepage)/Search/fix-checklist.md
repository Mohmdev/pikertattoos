---
description: Checklist of things to do to optimize search setup. Make sure to check the step that you finish in this file and then move on to next.
globs:
---

# Prioritized checklist of tasks to fix these issues

Breaking down the problem systemically and then implementing a solution is the best way to fix the issue.

1. State Management is scattered across components with potential race conditions
2. Multiple search triggers happening from both SearchInput and CategoryListSlider
3. URL synchronization causing unnecessary server reloads
4. Initialization issues causing potential infinite loops
5. No proper caching strategy
6. Redundant server requests

Recommended to start with creating the centralized useSearch hook since that will be the foundation for all other improvements.

## Checklist

1. State Management Centralization

- [✓] Create a new useSearch hook using React Query
- [✓] Move search state logic out of RenderPage.tsx
- [✓] Implement proper loading/error/success states
- [✓] Add proper TypeScript types for search states

2. Search Flow Optimization

- [✓] Consolidate search triggers from SearchInput and CategoryListSlider
- [✓] Implement proper debouncing in useSearch hook
- [✓] Add request cancellation for stale queries
- [✓] Implement proper caching strategy

3. URL Synchronization

- [✓] Move URL management to useSearch hook
- [✓] Prevent unnecessary page reloads on URL updates
- [✓] Implement proper history state management
- [✓] Handle initial server state hydration

4. Component Updates

- [✓] Update SearchInput to use new useSearch hook
- [✓] Update CategoryListSlider to use same search flow
- [✓] Update SearchResults to handle new state structure
- [✓] Add proper loading states to all components

5. Performance Optimizations

- [ ] Add proper memoization where needed
- [ ] Implement request deduplication
- [ ] Add proper error boundaries
- [ ] Optimize re-renders
