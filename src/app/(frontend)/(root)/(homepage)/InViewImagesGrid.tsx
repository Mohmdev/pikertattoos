'use client'

import { motion } from 'motion/react'
import { cn } from '@utils/cn'

import type { Media as MediaType } from '@payload-types'

import { Media } from '@components/dynamic/Media'

import { InView } from './in-view'
import { TiltSpotlight } from './TiltSpotlight'

type InViewImagesGridProps = {
  images: MediaType[]
}

export const InViewImagesGrid = ({ images }: InViewImagesGridProps) => {
  return (
    <div className="h-full w-full overflow-auto">
      {/* <div className="mb-20 py-12 text-center text-sm">Scroll down</div> */}
      <div className="flex h-max items-end justify-center pb-12">
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
          <div className="columns-2 gap-4 px-8 sm:columns-3">
            {images.map((image) => {
              return (
                <TiltSpotlight key={image.id} title={image.alt}>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        filter: 'blur(0px)'
                      }
                    }}
                    className={cn(
                      // 'aspect-auto h-max w-full',
                      'relative mb-4 size-full overflow-hidden rounded-sm'
                    )}
                  >
                    <Media
                      resource={image}
                      className="size-full rounded-lg object-contain"
                      objectFit="contain"
                    />
                  </motion.div>
                </TiltSpotlight>
              )
            })}
          </div>
        </InView>
      </div>
    </div>
  )
}
