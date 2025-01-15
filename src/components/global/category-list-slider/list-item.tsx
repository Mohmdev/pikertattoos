'use client'

import React from 'react'

import { cn } from '@utils/cn'

type GroupListItemProps = {
  icon: React.ReactNode
  label: string
  selected?: string
  iconSize?: number
}

export const GroupListItem = ({ icon, label, selected, iconSize = 20 }: GroupListItemProps) => {
  return (
    <div
      className={cn(
        'text-md flex cursor-pointer items-center gap-3 rounded-2xl border-2 bg-themeGray/70 px-4 py-1.5',
        selected === label ? 'border-themeTextGray' : 'border-transparent'
      )}
    >
      {React.isValidElement(icon) &&
        React.cloneElement(icon, {
          size: iconSize,
          className: 'text-themeTextGray'
        } as React.SVGProps<SVGSVGElement>)}
      {label}
    </div>
  )
}
