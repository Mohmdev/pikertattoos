import { useRouter } from 'next/navigation'

import { motion } from 'motion/react'
import { cn } from '@utils/cn'
import { Spotlight } from '@/app/(frontend)/(root)/(homepage)/components/spotlight'

import type { Media as MediaType, Style, Tattoo } from '@payload-types'

import { Media } from '@components/dynamic/Media'

type MorphingTriggerCardProps = {
  tattoo: Tattoo
  hideTitle?: boolean
}

export const MorphingTriggerCard = ({ tattoo, hideTitle = false }: MorphingTriggerCardProps) => {
  const router = useRouter()

  const style =
    Array.isArray(tattoo.style) && tattoo.style[0] ? (tattoo.style[0] as Style) : undefined

  const image =
    Array.isArray(tattoo.images) && tattoo.images[0] ? (tattoo.images[0] as MediaType) : undefined

  if (!image) return null

  return (
    <motion.div
      layoutId={`morphing-dialog-${tattoo.id}`}
      className="group relative mb-4 cursor-pointer rounded-lg"
      onClick={(e) => {
        e.preventDefault()
        router.push(`/tattoo/${tattoo.slug}`)
      }}
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
    >
      <Spotlight
        className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
        size={248}
        springOptions={{
          stiffness: 26.7,
          damping: 4.1,
          mass: 0.2
        }}
      />
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
    </motion.div>
  )
}
