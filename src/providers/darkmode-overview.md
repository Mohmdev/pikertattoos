# Dark Mode and Theme Provider

## Overview

The project implements a robust theme system with dark/light modes using a combination of Tailwind CSS, CSS custom properties (variables), and React context providers. The system supports:

- Manual theme switching (dark/light/auto)
- System preference detection
- Per-route header theme overrides
- Theme persistence via localStorage

## Core Components

### 1. Tailwind Configuration

```typescript
darkMode: ['selector', '[data-theme="dark"]']
```

This configures Tailwind to apply dark styles when the `data-theme="dark"` attribute is present on the HTML element.

### 2. Theme Providers

The system uses two main providers:

- **ThemeProvider**: Manages the global theme state
  - Handles theme persistence
  - Responds to system preferences
  - Sets the `data-theme` attribute
- **HeaderThemeProvider**: Enables per-route theme overrides
  - Useful for sections requiring specific theme settings
  - Independent of global theme state

### 3. Theme Storage

- Theme preference is stored in localStorage
- Falls back to system preference if no stored value
- Supports "auto" mode to follow system preferences

## Implementation Flow

1. **Initial Load**:

   - `InitTheme` script runs before React hydration
   - Checks localStorage for saved preference
   - Falls back to system preference
   - Sets initial `data-theme` attribute

2. **Runtime**:

   - `ThemeProvider` maintains theme state
   - `useTheme` hook provides theme controls
   - Theme changes update both state and DOM

3. **Per-route Theming**:
   - Routes can import `useHeaderTheme`
   - Override header theme independently
   - Useful for dark headers over light content

## Usage Examples

### Global Theme Switch

```typescript
const { setTheme } = useTheme()
setTheme('dark') // or 'light' or null for auto
```

### Route-specific Override

```typescript
const { setHeaderTheme } = useHeaderTheme()
setHeaderTheme('dark') // Override header theme
```

## CSS Structure

- Base theme variables in `:root`
- Dark theme overrides in `[data-theme='dark']`
- Uses CSS custom properties for colors
- Tailwind classes reference these custom properties

## Best Practices

1. Use Tailwind's dark mode classes for simple toggles
2. Use CSS variables for complex theming
3. Consider header theme overrides for hero sections
4. Default to dark theme for consistent initial load
5. Always provide fallback for system preferences
