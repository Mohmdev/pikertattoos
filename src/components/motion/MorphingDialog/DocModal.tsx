'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import type { Area, Media, Style, Tag, Tattoo } from '@payload-types'

import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogTitle
} from '@components/motion/MorphingDialog/intercepting-morphing-dialog'

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

export function DocModal({ doc }: { doc: Partial<Tattoo> }) {
  const router = useRouter()
  const firstImage = doc.images?.[0]
  const hasImage = firstImage && isMedia(firstImage)

  const styles = doc.style?.filter(isStyle) ?? []
  const areas = doc.area?.filter(isArea) ?? []
  const tags = doc.tags?.filter(isTag) ?? []

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back()
    }
  }

  return (
    <MorphingDialog isOpen={true} onOpenChange={handleOpenChange}>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-background p-6 shadow-lg">
          <MorphingDialogClose />

          {hasImage && (
            <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={firstImage.url}
                alt={firstImage.alt || ''}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <MorphingDialogTitle className="mb-2 text-2xl font-bold">{doc.title}</MorphingDialogTitle>

          {(styles.length > 0 || areas.length > 0) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {styles.map((style) => (
                <span key={style.id} className="rounded-full bg-muted px-3 py-1 text-xs">
                  {style.title}
                </span>
              ))}
              {areas.map((area) => (
                <span key={area.id} className="rounded-full bg-muted px-3 py-1 text-xs">
                  {area.title}
                </span>
              ))}
            </div>
          )}

          <MorphingDialogDescription className="prose prose-sm dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: doc.description?.toString() ?? '' }} />
          </MorphingDialogDescription>

          {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                >
                  #{tag.title}
                </span>
              ))}
            </div>
          )}
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}
