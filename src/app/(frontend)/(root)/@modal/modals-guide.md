# Modal functionality for Docs using Parallel & Intercepting Routes

## Overview

This setup enables modal functionality for cards listed on the homepage using Next.js parallel and intercepting routes. When a card is clicked on the homepage, instead of navigating to a new page, the content is displayed in a modal overlay while preserving the homepage URL.

## Quick Architecture Diagram

```
Homepage (/)
└── TriggerCards
└── Link → /tattoo/[slug]
├── Primary Route: /tattoo/[slug]
│ └── RenderDoc (Full page view)
└── Intercepting Route: /(.)tattoo/[slug]
└── DocModalContent (Modal view)
```

## Detailed Implementation

### 1. Route Structure

```
src/app/(frontend)/(root)/
├── page.tsx # Homepage
├── @modal/ # Parallel route segment
│ └── (.)tattoo/[slug]/ # Intercepting route
│ ├── page.tsx
│ ├── DocModalProvider.tsx
│ └── DocModalContent.tsx
└── tattoo/[slug]/ # Primary route
├── page.tsx
└── RenderDoc.tsx
```

### 2. Key Components

#### Source: Homepage [src/app/(frontend)/(root)/(homepage)/page.tsx]

- Lists TriggerCards that serve as entry points
- Each card is wrapped in a Link component pointing to `/tattoo/[slug]`

#### TriggerCard [src/app/(frontend)/(root)/(homepage)/components/TriggerCard.tsx]

- Renders individual cards with image and metadata
- When `enableLink={true}`, wraps content in Next.js Link component

#### Primary Route [src/app/(frontend)/(root)/tattoo/[slug]/page.tsx]

- Handles full-page view of tattoo content
- Renders using RenderDoc component
- Generated for all tattoo slugs via `generateStaticParams()`

#### Intercepting Route [src/app/(frontend)/(root)/@modal/(.)tattoo/[slug]/page.tsx]

- Intercepts navigation when accessed from homepage
- Wraps content in DocModalProvider
- Renders same content as primary route but in modal format

#### Modal Components

- **DocModalProvider** [src/app/(frontend)/(root)/@modal/(.)tattoo/[slug]/DocModalProvider.tsx]

  - Manages modal state and navigation
  - Uses shadcn Dialog component
  - Handles closing modal via `router.back()`

- **DocModalContent** [src/app/(frontend)/(root)/@modal/(.)tattoo/[slug]/DocModalContent.tsx]
  - Renders tattoo content in modal format
  - Similar to RenderDoc but optimized for modal view

### 3. How It Works

1. **Initial State**

   - Homepage displays grid of TriggerCards
   - Each card links to `/tattoo/[slug]`

2. **User Interaction**

   - User clicks card on homepage
   - Next.js intercepts navigation

3. **Route Interception**

   - Instead of navigating to `/tattoo/[slug]`
   - Renders `/(.)tattoo/[slug]` as modal
   - Homepage remains visible underneath

4. **Modal State**
   - DocModalProvider manages modal visibility
   - Uses `router.back()` for closing
   - Returns to homepage when closed

### 4. Key Features

- **URL Preservation**: Modal state reflected in URL
- **History Management**: Browser back button closes modal
- **SEO Friendly**: Primary routes remain crawlable
- **Progressive Enhancement**: Works without JS (falls back to full page)

### 5. Implementation Requirements

1. **Route Configuration**

   - Parallel route segment (`@modal`)
   - Intercepting route with (.) prefix
   - Matching primary route structure

2. **Component Setup**

   - Modal provider with navigation logic
   - Content components for both views
   - Link wrapping for source elements

3. **Data Handling**
   - Consistent data fetching for both views
   - Shared types and interfaces
   - Proper error handling

### 6. Common Gotchas

- Ensure modal provider handles navigation properly
- Match content structure between views
- Handle loading and error states
- Consider mobile responsiveness
- Test browser history behavior
