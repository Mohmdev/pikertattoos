import Link from 'next/link'

import useClickableCard from '@hooks/useClickableCard'
import { cn } from '@utils/cn'

import type { Media as MediaType, Style, Tattoo } from '@payload-types'

import { Media } from '@components/dynamic/Media'

import { Spotlight } from './spotlight'

type TriggerCardProps = {
  doc: Tattoo
  hideTitle?: boolean
  enableSpotlight?: boolean
  enableLink?: boolean
  className?: string
}

export const TriggerCard = ({
  doc,
  hideTitle = true,
  enableSpotlight = true,
  enableLink = true,
  className,
}: TriggerCardProps) => {
  const { card, link } = useClickableCard<HTMLDivElement>({})
  const tattoo = doc as Tattoo

  const style =
    Array.isArray(tattoo.style) && tattoo.style[0]
      ? (tattoo.style[0] as Style)
      : undefined

  const firstImage =
    Array.isArray(tattoo.images) && tattoo.images[0]
      ? (tattoo.images[0] as MediaType)
      : undefined

  if (!firstImage) return null

  return (
    <div
      ref={card.ref}
      className={cn('group relative overflow-hidden rounded-lg', className)}
    >
      {enableSpotlight && (
        <Spotlight
          className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
          size={248}
          springOptions={{
            stiffness: 26.7,
            damping: 4.1,
            mass: 0.2,
          }}
        />
      )}
      {firstImage && (
        <Media
          resource={firstImage}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={firstImage?.alt ? firstImage.alt : '2001: A Space Odyssey'}
          className="grayscale duration-700 group-hover:grayscale-0"
        />
      )}
      {!hideTitle && (
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 mx-0 h-max w-max',
            'flex flex-col gap-0 space-y-0.5 p-5',
          )}
        >
          <p className="m-0 text-sm text-black dark:text-white">
            {style && style.title}
          </p>
        </div>
      )}
      {enableLink && (
        <Link
          ref={link.ref}
          href={`/tattoo/${tattoo.slug}`}
          aria-label={tattoo.title}
          className="hidden"
        />
      )}
    </div>
  )
}
