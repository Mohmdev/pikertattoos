import type { CMSLinkOptions, Reference } from '@components/types'
import type { Page, Post, Tattoo } from '@payload-types'

type GenerateSlugType = {
  type?: CMSLinkOptions
  url?: string | null
  reference?: Reference | null
}

export const generateReferenceURL = (args: GenerateSlugType): string => {
  const { type, reference, url } = args

  if ((type === 'custom' || type === undefined) && url) {
    return url
  }

  if (type === 'reference' && reference?.value && typeof reference.value !== 'string') {
    if (reference.relationTo === 'pages') {
      const value = reference.value as Page
      const breadcrumbs = value?.breadcrumbs
      const hasBreadcrumbs = breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0
      if (hasBreadcrumbs) {
        return breadcrumbs[breadcrumbs.length - 1]?.url as string
      }
    }

    if (reference.relationTo === 'posts' && typeof reference.value === 'object') {
      const value = reference.value as Post
      return `/blog/${value.slug}`
    }

    if (reference.relationTo === 'tattoo' && typeof reference.value === 'object') {
      const value = reference.value as Tattoo
      return `/tattoo/${value.slug}`
    }

    // Add type guard for the fallback case
    if (typeof reference.value === 'object' && 'slug' in reference.value) {
      return `/${reference.relationTo}/${reference.value.slug}`
    }
  }

  return ''
}
