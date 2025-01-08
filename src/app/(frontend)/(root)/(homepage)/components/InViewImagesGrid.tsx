'use client'

import { cn } from '@utils/cn'

import type { Media as MediaType } from '@payload-types'

import { Media } from '@components/dynamic/Media'

import { InView } from './in-view'
import { TiltSpotlight } from './TiltSpotlight'

type InViewImagesGridProps = {
  images: MediaType[]
  title?: string | null
}

export const InViewImagesGrid = ({ images }: InViewImagesGridProps) => {
  return (
    <div
      className={cn(
        'overflow-auto',
        'h-max max-w-[1920px]',
        'flex items-end justify-center px-0 pb-12'
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
          {images.map((image) => {
            return (
              // mb-4
              <TiltSpotlight key={image.id} className="mb-4">
                <Media
                  resource={image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={image.alt ? image.alt : '2001: A Space Odyssey'}
                />
                <div
                  className={cn(
                    'absolute inset-x-0 bottom-0 mx-0 h-max w-full',
                    'flex flex-col gap-3 space-y-0.5 p-5'
                  )}
                >
                  <h3 className="font-mono text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {image.alt ? image.alt : '2001: A Space Odyssey'}
                  </h3>
                  <p className="text-sm text-black dark:text-white">Stanley Kubrick</p>
                </div>
              </TiltSpotlight>
            )
          })}
        </div>
      </InView>
    </div>
  )
}
