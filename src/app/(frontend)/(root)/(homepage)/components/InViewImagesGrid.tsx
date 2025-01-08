'use client'

import { cn } from '@utils/cn'

import type { Media as MediaType, Style, Tattoo } from '@payload-types'

import { Media } from '@components/dynamic/Media'

import { InView } from './in-view'
import { TiltSpotlight } from './TiltSpotlight'

type InViewImagesGridProps = {
  data: Tattoo[]
}

export const InViewImagesGrid = ({ data }: InViewImagesGridProps) => {
  if (!data) return null

  return (
    <div
      className={cn(
        'overflow-auto',
        'h-max max-w-[1920px]',
        'flex items-end justify-center px-6 pb-12'
      )}
    >
      {/* <div className="mb-20 py-12 text-center text-sm">Scroll down</div> */}
      <InView
        viewOptions={{ once: true, margin: '0px 0px -250px 0px' }}
        variants={{
          hidden: {
            opacity: 0
          },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.09
            }
          }
        }}
      >
        <div className="w-full columns-2 sm:columns-3">
          {data.map((tattoo) => {
            const title = tattoo.title

            const style =
              Array.isArray(tattoo.style) && tattoo.style[0]
                ? (tattoo.style[0] as Style)
                : undefined

            const image =
              Array.isArray(tattoo.images) && tattoo.images[0]
                ? (tattoo.images[0] as MediaType)
                : undefined

            if (!image) return null

            return (
              <TiltSpotlight key={tattoo.id} className="mb-4">
                <Media
                  resource={image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={image?.alt ? image.alt : '2001: A Space Odyssey'}
                  className="grayscale duration-700 group-hover:grayscale-0"
                />
                <div
                  className={cn(
                    'absolute inset-x-0 bottom-0 mx-0 h-max w-max',
                    'flex flex-col gap-0 space-y-0.5 p-5',
                    'before:absolute before:inset-0 before:-z-0 before:bg-yellow-100 before:opacity-20 before:blur-xl before:content-[""]'
                  )}
                >
                  <h3 className="font-mono text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {style && style.title}
                  </h3>
                  <p className="text-sm text-black dark:text-white">{title}</p>
                </div>
              </TiltSpotlight>
            )
          })}
        </div>
      </InView>
    </div>
  )
}
