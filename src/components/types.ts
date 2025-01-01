import type { BannerBlock, Page, Post, Tattoo } from '@payload-types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const relationSlugs = {
  tattoo: 'tattoo'
}

type PageReference = {
  value: number | Page
  relationTo: 'pages'
}

type PostsReference = {
  value: number | Post
  relationTo: 'posts'
}

type TattooReference = {
  value: number | Tattoo
  relationTo: (typeof relationSlugs)['tattoo']
}

export type Reference = PageReference | PostsReference | TattooReference

export type CMSLink = NonNullable<Page['hero']['breadcrumbsBarLinks']>[number]['link']

export type CMSLinkOptions = 'custom' | 'reference' | null

export type Settings = BannerBlock['bannerFields']['settings']

// This was hardcoded
export type PaddingOptions = {
  bottom?: 'large' | 'small'
  top?: 'hero' | 'large' | 'small'
}

export type LinkAppearanceOptions =
  | 'default'
  | 'outline'
  | 'secondary'
  | 'destructive'
  | 'ghost'
  | 'link'
  | null

export type RichTextOptions = {
  type: string
  children: {
    type: string
    version: number
    [k: string]: unknown
  }[]
  direction: 'ltr' | 'rtl' | null
  format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
  indent: number
  version: number
}
