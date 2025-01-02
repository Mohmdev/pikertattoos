import React, { Suspense } from 'react'

import { cn } from '@utils/cn'

import classes from './index.module.scss'

type BackgroundGradientProps = {
  className?: string
}

export default function BackgroundGradient(props: BackgroundGradientProps) {
  const { className } = props

  return (
    <div className={cn('bg-background', className, classes.backgroundGradientWrapper)}>
      <Suspense>
        <video
          autoPlay
          loop
          muted
          playsInline
          // TODO: make this changable
          src="https://l4wlsi8vxy8hre4v.public.blob.vercel-storage.com/video/glass-animation-5-f0gPcjmKFIV3ot5MGOdNy2r4QHBoXt.mp4"
        />
      </Suspense>
    </div>
  )
}
