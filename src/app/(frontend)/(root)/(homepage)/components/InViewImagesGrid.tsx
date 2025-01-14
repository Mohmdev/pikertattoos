'use client'

import { cn } from '@utils/cn'

import type { Tattoo } from '@payload-types'

import { MorphingTriggerCard } from '@components/motion/MorphingDialog/MorphingTriggerCard'

import { InView } from './in-view'

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
        'flex items-end justify-center px-2 pb-12 md:px-4'
      )}
    >
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
          {data.map((tattoo) => (
            <MorphingTriggerCard hideTitle key={tattoo.id} tattoo={tattoo} />
          ))}
        </div>
      </InView>
    </div>
  )
}
