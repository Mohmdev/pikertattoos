'use client'

import React from 'react'

import { cn } from '@utils/cn'

type GroupListItemProps = {
  icon?: React.ReactNode
  label: string
  selected?: string
}

export const GroupListItem = ({ icon, label, selected }: GroupListItemProps) => {
  return (
    <div
      className={cn(
        '-mr-1 flex cursor-pointer items-center gap-2 rounded-lg border-2 bg-themeGray/70 px-4 py-1.5 text-sm',
        selected === label ? 'border-themeTextGray' : 'border-transparent'
      )}
    >
      {icon &&
        React.isValidElement(icon) &&
        React.cloneElement(icon, {
          className: 'text-themeTextGray size-[1.125rem]'
        } as React.SVGProps<SVGSVGElement>)}

      {label}
    </div>
  )
}
