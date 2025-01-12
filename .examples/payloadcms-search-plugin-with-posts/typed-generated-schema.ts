/**
 * These types are used to generate the search plugin config.
 */
export type FieldsOverride = (args: { defaultFields: Field[] }) => Field[]
export type BeforeSync = (args: {
  originalDoc: {
    [key: string]: any
  }
  payload: Payload
  req: PayloadRequest
  searchDoc: DocToSync
}) => DocToSync | Promise<DocToSync>
export type DocToSync = {
  [key: string]: any
  doc: {
    relationTo: string
    value: string
  }
  title: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: string
  title: string
  heroImage?: (string | null) | Media
  content: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  }
  categories?: (string | Category)[] | null
  meta?: {
    title?: string | null
    image?: (string | null) | Media
    description?: string | null
  }
  slug?: string | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string
  alt?: string | null
  caption?: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  updatedAt: string
  createdAt: string
  url?: string | null
  thumbnailURL?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: string
  title: string
  slug?: string | null
  slugLock?: boolean | null
  parent?: (string | null) | Category
  breadcrumbs?:
    | {
        doc?: (string | null) | Category
        url?: string | null
        label?: string | null
        id?: string | null
      }[]
    | null
  updatedAt: string
  createdAt: string
}
/**
 * This is a collection of automatically created search results. These results are used by the global site search and will be updated automatically as documents in the CMS are created or updated.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "search".
 */
export interface Search {
  id: string
  title?: string | null
  priority?: number | null
  doc: {
    relationTo: 'posts'
    value: string | Post
  }
  slug?: string | null
  meta?: {
    title?: string | null
    description?: string | null
    image?: (string | null) | Media
  }
  categories?:
    | {
        relationTo?: string | null
        id?: string | null
        title?: string | null
      }[]
    | null
  updatedAt: string
  createdAt: string
}
