import React from 'react'

import { cn } from '@utils/cn'

import { ShimmerButton } from '@ui/shimmer-button'

interface CategoryButtonProps {
  label: string
  selected?: string
}

export const CategoryButton = ({ label, selected }: CategoryButtonProps) => {
  return (
    <ShimmerButton
      className={cn(
        'flex cursor-pointer items-center gap-2 text-sm',
        // 'bg-themeGray/70',
        // 'border-2',
        'p-0',
        'isolate z-[9999]',
        'shadow-xl'
      )}
      background="rgb(0 0 0 / 1)"
      shimmerSpread={selected === label ? '90deg' : '0deg'}
      borderRadius="0.5rem"
    >
      <span
        className={cn(
          'text-center text-sm',
          //   'tracking-tight',
          'text-white dark:from-white dark:to-slate-900/10',
          //   'whitespace-pre-wrap',
          //   'leading-none',
          'px-4 py-1.5'
        )}
      >
        {label}
      </span>
    </ShimmerButton>
  )
}

CategoryButton.displayName = 'CategoryButton'
