import Link from 'next/link'

import { cn } from '@utils/cn'
import { Spotlight } from '@/app/(frontend)/(root)/(homepage)/components/spotlight'

import type { Media as MediaType, Style, Tattoo } from '@payload-types'

import { Media } from '@components/dynamic/Media'

type TriggerCardProps = {
  doc: Tattoo
  hideTitle?: boolean
  enableSpotlight?: boolean
  enableLink?: boolean
}

export const TriggerCard = ({
  doc,
  hideTitle = true,
  enableSpotlight = true,
  enableLink = true
}: TriggerCardProps) => {
  const tattoo = doc as Tattoo

  const style =
    Array.isArray(tattoo.style) && tattoo.style[0] ? (tattoo.style[0] as Style) : undefined

  const image =
    Array.isArray(tattoo.images) && tattoo.images[0] ? (tattoo.images[0] as MediaType) : undefined

  if (!image) return null

  const content = (
    <>
      {enableSpotlight && (
        <Spotlight
          className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
          size={248}
          springOptions={{
            stiffness: 26.7,
            damping: 4.1,
            mass: 0.2
          }}
        />
      )}
      <Media
        resource={image}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={image?.alt ? image.alt : '2001: A Space Odyssey'}
        className="grayscale duration-700 group-hover:grayscale-0"
      />

      {!hideTitle && (
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 mx-0 h-max w-max',
            'flex flex-col gap-0 space-y-0.5 p-5'
          )}
        >
          <p className="m-0 text-sm text-black dark:text-white">{style && style.title}</p>
        </div>
      )}
    </>
  )

  return enableLink ? (
    <Link href={`/tattoo/${tattoo.slug}`} aria-label={tattoo.title}>
      {content}
    </Link>
  ) : (
    content
  )
}
