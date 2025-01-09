import React from 'react'

import { cn } from '@utils/cn'

import type { Homepage, Tattoo } from '@payload-types'

import BackdropGradient from '@components/global/backdrop-gradient'
import GradientText from '@components/global/gradient-text'

import { InViewImagesGrid } from './components/InViewImagesGrid'

interface RenderPageProps {
  data: Homepage
}

export const RenderPage = ({ data }: RenderPageProps) => {
  const { title, subtitle, featured } = data
  const tattoos = featured as Tattoo[]

  return (
    <div
      className={cn(
        //
        'flex flex-1 flex-col',
        'items-center justify-center',
        'my-10 gap-10 px-0 xl:px-10',
        'min-h-screen'
      )}
    >
      <div className="mt-10 flex flex-col items-center gap-2">
        <BackdropGradient
          className={cn(
            'm-0 size-full'
            // 'h-3/6 xl:h-2/6'
            // 'h-3/6 w-4/12 md:w-5/12 xl:h-2/6 xl:w-3/12'
          )}
          container="items-center"
        >
          <GradientText
            className="text-center text-[40px] font-semibold leading-none md:text-[55px] lg:text-[90px]"
            element="H1"
          >
            {title ? title : 'Nexweb Studio'}
          </GradientText>
          <p className="pt-2 leading-none text-themeTextGray">
            {subtitle ? subtitle : 'Web Technology Solutions'}
          </p>
        </BackdropGradient>
      </div>

      <div
        className={cn('relative flex w-max max-w-full flex-col items-center overflow-x-hidden')}
        style={{
          maskImage: `linear-gradient(to right,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.6) 40%,rgba(0, 0, 0, 0.6) 60%,rgba(0, 0, 0, 0))`
        }}
      >
        <InViewImagesGrid data={tattoos} />
      </div>
    </div>
  )
}
