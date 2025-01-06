import React from 'react'

import { cn } from '@utils/cn'

import type { Homepage, Media } from '@payload-types'

import BackdropGradient from '@components/global/backdrop-gradient'
import GradientText from '@components/global/gradient-text'

import { InViewImagesGrid } from './InViewImagesGrid'

export const RenderHomepage = ({ homeData }: { homeData: Homepage }) => {
  const { featured, title, subtitle } = homeData
  const images = featured.filter((item): item is Media => typeof item === 'object' && item !== null)

  // if (!homeData) return null

  return (
    <>
      <GradientText
        className="text-center text-[40px] font-semibold leading-none md:text-[55px] lg:text-[90px]"
        element="H1"
      >
        {title ? title : 'Nexweb Studio'}
      </GradientText>
      <p className="pt-2 leading-none text-themeTextGray">
        {subtitle ? subtitle : 'Web Technology Solutions'}
      </p>
      <BackdropGradient
        className={cn(
          'w-full',
          // 'h-full'
          // 'h-3/6 xl:h-2/6'
          'h-3/6 w-4/12 md:w-5/12 xl:h-2/6 xl:w-3/12'
        )}
        container="items-center"
      >
        <div
          className={cn(
            'mb-36',
            'relative flex w-max max-w-full flex-col items-center overflow-x-hidden'
          )}
          style={{
            maskImage: `linear-gradient(to right,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.4) 50%,rgba(0, 0, 0, 0.4) 50%,rgba(0, 0, 0, 0))`
          }}
        >
          {images && <InViewImagesGrid images={images} />}
        </div>
      </BackdropGradient>
    </>
  )
}
