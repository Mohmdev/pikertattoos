import { GlobalSlug, PayloadRequest } from 'payload'

type Props = {
  global: GlobalSlug
  slug: string
  req: PayloadRequest
}

export const generateGlobalPreviewPath = ({ global, slug, req }: Props) => {
  // No need for a prefix map. All globals go to /theme-editor
  const encodedParams = new URLSearchParams({
    slug,
    global,
    path: '/theme-editor',
    previewSecret: process.env.PREVIEW_SECRET || 'DUNE_3',
  })

  const isProduction =
    process.env.NODE_ENV === 'production' ||
    Boolean(process.env.VERCEL_PROJECT_PRODUCTION_URL)

  const protocol = isProduction ? 'https:' : req.protocol

  return `${protocol}//${req.host}/next/preview-global?${encodedParams.toString()}`
}
