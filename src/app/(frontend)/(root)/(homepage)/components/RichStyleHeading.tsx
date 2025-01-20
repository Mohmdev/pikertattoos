'use client'

import React from 'react'

import { useTheme } from 'next-themes'
import { cn } from '@utils/cn'

import { LineShadowText } from '@ui/line-shadow-text'
import { NeonGradientBackground } from '@ui/neon-gradient-background'

interface RichStyleHeadingProps {
  text?: string | null
  highlightedText?: string | null
  className?: string
  withGradientBackground?: boolean
}

export function RichStyleHeading({
  text,
  highlightedText,
  className,
  withGradientBackground = true
}: RichStyleHeadingProps) {
  const { resolvedTheme } = useTheme()
  const [shadowColor, setShadowColor] = React.useState('black')

  React.useEffect(() => {
    setShadowColor(resolvedTheme === 'dark' ? 'white' : 'black')
  }, [resolvedTheme])

  const content = (
    <div
      className={cn('relative flex w-max flex-col items-center overflow-visible px-4')}
      style={{
        maskImage: `radial-gradient(circle at center, 
        rgba(255, 255, 255, 1) 0%, 
        rgba(255, 255, 255, 0.8) 30%,
        rgba(255, 255, 255, 0.4) 70%, 
        rgba(255, 255, 255, 0.1) 100%)`
      }}
    >
      <h1
        className={cn(
          'text-balance text-center',
          'tracking-tight',
          'text-center text-[50px] font-semibold leading-none md:text-[55px] lg:text-[90px]',
          className
        )}
      >
        {text && <span>{text}</span>}

        {highlightedText && (
          <LineShadowText as="span" className="italic" shadowColor={shadowColor}>
            {highlightedText}
          </LineShadowText>
        )}
      </h1>
    </div>
  )

  return withGradientBackground ? (
    <NeonGradientBackground>{content}</NeonGradientBackground>
  ) : (
    content
  )
}
