'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@utils/cn'

import type { Area, Media, Style, Tag, Tattoo } from '@payload-types'

const isMedia = (media: Media | number): media is Media & { url: string } => {
  return typeof media !== 'number' && 'url' in media && typeof media.url === 'string'
}

const isStyle = (style: Style | number): style is Style => {
  return typeof style !== 'number' && 'title' in style
}

const isArea = (area: Area | number): area is Area => {
  return typeof area !== 'number' && 'title' in area
}

const isTag = (tag: Tag | number): tag is Tag => {
  return typeof tag !== 'number' && 'title' in tag
}

type Props = {
  doc: Partial<Tattoo>
  router: ReturnType<typeof useRouter>
}

export function MorphingDocModal({ doc, router }: Props) {
  return (
    <AnimatePresence>
      <div className="relative">
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => router.back()}
        />
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            layoutId={`morphing-dialog-${doc.id}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            className={cn(
              'relative max-h-[90vh] w-full max-w-3xl overflow-y-auto',
              'rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900'
            )}
          >
            <button
              onClick={() => router.back()}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            >
              ✕
            </button>

            {doc.images?.[0] && isMedia(doc.images?.[0]) && (
              <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={doc.images?.[0].url}
                  alt={doc.images?.[0].alt || ''}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <h2 className="mb-2 text-2xl font-bold">{doc.title}</h2>

            {(doc.style?.filter(isStyle) ?? []).length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {(doc.style?.filter(isStyle) ?? []).map((style) => (
                  <span key={style.id} className="rounded-full bg-muted px-3 py-1 text-xs">
                    {style.title}
                  </span>
                ))}
              </div>
            )}

            {(doc.area?.filter(isArea) ?? []).length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {(doc.area?.filter(isArea) ?? []).map((area) => (
                  <span key={area.id} className="rounded-full bg-muted px-3 py-1 text-xs">
                    {area.title}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-sm dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: doc.description?.toString() ?? '' }} />
            </div>

            {doc.tags && doc.tags.filter(isTag).length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {doc.tags.filter(isTag).map((tag) => (
                  <span
                    key={tag.id}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                  >
                    #{tag.title}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}
