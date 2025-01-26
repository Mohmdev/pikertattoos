import React from 'react'

import { cn } from '@utils/cn'

type Props = {
  children: React.ReactNode
  className?: string
  gradient?: {
    color?: string
    opacity?: number
    blur?: number
    position?: {
      top?: number
      bottom?: number
    }
    size?: {
      width?: number
      height?: number
    }
    placeOverContent?: boolean
    margin?: {
      left?: number
      right?: number
    }
    borderRadius?: number
  }
}

export const BackdropGradient = ({ children, className, gradient }: Props) => {
  return (
    <div className={cn('relative flex size-full flex-col items-center', className)}>
      <div
        style={{
          position: 'absolute',
          top: `${gradient?.position?.top ?? 30}%`,
          bottom: `${gradient?.position?.bottom ?? 49}%`,
          left: 0,
          right: 0,
          zIndex: gradient?.placeOverContent ? 10 : -1,
          // gradient configuration
          backgroundColor: gradient?.color ?? 'white',
          opacity: gradient?.opacity ?? 0.4,
          filter: `blur(${gradient?.blur ?? 6.25}rem)`,
          marginLeft: `${gradient?.margin?.left ?? 2.5}rem`,
          marginRight: `${gradient?.margin?.right ?? 2.5}rem`,
          width: `${gradient?.size?.width ?? 90}%`,
          borderRadius: `${gradient?.borderRadius ?? 50}%`
        }}
      />
      {children}
    </div>
  )
}
