'use client'

import React from 'react'

import { cn } from '@utils/cn'

import { useTheme } from '@providers/Theme'
import { LineShadowText } from '@ui/line-shadow-text'
import { NeonGradientBackground } from '@ui/neon-gradient-background'

interface RichStyleHeadingProps {
  text?: string | null
  highlightedText?: string | null
  className?: string
  withGradientBackground?: boolean
  neonColors?: {
    firstColor: string
    secondColor: string
    opacity: number
  }
  customShadowColor?: string
}

export function RichStyleHeading({
  text,
  highlightedText,
  className,
  withGradientBackground = true,
  neonColors = {
    firstColor: '#005994',
    secondColor: '#009C7F',
    opacity: 1
  },
  customShadowColor
}: RichStyleHeadingProps) {
  const { theme } = useTheme()

  console.log('theme', theme)

  const shadowColor = customShadowColor ?? (theme === 'dark' ? 'white' : 'black')

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
    <NeonGradientBackground neonColors={neonColors}>{content}</NeonGradientBackground>
  ) : (
    content
  )
}
