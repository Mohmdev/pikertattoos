import React from 'react'

import { X } from 'lucide-react'
import { cn } from '@utils/cn'

interface CategoryButtonProps {
  label: string
  selected?: string
  radius?: string
  colors?: {
    from?: string
    via?: string
    to?: string
  }
  includeCloseButton?: boolean
  className?: string
  onClick?: () => void
  isLoading?: boolean
}

export const CategoryButton = ({
  label,
  selected,
  radius = '0.5rem',
  colors = {
    from: 'rgb(255,255,255, 0.2)',
    via: 'rgb(255,255,255, 0.5)',
    to: 'rgb(255,255,255, 0.2)'
    // from: '#2dd4bf',
    // via: '#3b82f6',
    // to: '#a855f7'
  },
  includeCloseButton = false,
  className,
  onClick,
  isLoading = false
}: CategoryButtonProps) => {
  return (
    <button
      className={cn('group relative p-px', 'cursor-pointer overflow-hidden', className)}
      onClick={onClick}
      disabled={isLoading}
    >
      <div
        className={cn(
          'opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100',
          selected === label ? 'opacity-100' : 'opacity-0',
          'transition-opacity duration-300 ease-linear'
        )}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: radius,
          backgroundImage: `linear-gradient(to right, ${colors.from}, ${colors.via}, ${colors.to})`,
          animation: selected === label ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
        }}
      />
      <div
        style={{ borderRadius: radius }}
        className={cn(
          'relative z-10 flex size-full items-center justify-center',
          'bg-themeGray/70',
          'px-5 py-1.5',
          'transition-transform duration-300 ease-out',
          isLoading && 'opacity-50'
        )}
      >
        {includeCloseButton && (
          <div className="absolute right-1 top-1 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X
              className={cn(
                'h-3 w-3 transition-transform duration-300 ease-out',
                selected === label ? 'scale-100' : 'scale-0'
              )}
            />
            <span className="sr-only">Close</span>
          </div>
        )}
        <span
          className={cn(
            'transition-all duration-500',
            selected === label && includeCloseButton ? '-translate-x-1' : 'translate-x-0',
            selected === label ? 'scale-105' : 'scale-100',
            'text-white'
          )}
        >
          {label}
        </span>
      </div>
    </button>
  )
}

CategoryButton.displayName = 'CategoryButton'
