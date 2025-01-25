'use client'

import React from 'react'

import { SearchIcon } from 'lucide-react'
import { cn } from '@utils/cn'

type Props = {
  className?: string
  inputClassName?: string
  placeholder?: string
  iconClassName?: string
  glass?: boolean
  initialValue?: string
  onSearch?: (query: string | null) => void
  isLoading?: boolean
}

export const SearchInput = ({
  className,
  glass,
  iconClassName,
  inputClassName,
  placeholder = 'Search',
  initialValue = '',
  onSearch,
  isLoading = false
}: Props) => {
  return (
    <div
      className={cn(
        'flex flex-row items-center gap-2',
        glass && 'backdrop--blur__safari bg-clip-padding backdrop-blur-2xl backdrop-filter',
        className,
        'box-content flex w-full max-w-[90%] rounded-3xl border border-themeGray px-5 py-2 pl-4',
        'h-[20px] bg-[rgba(71,58,68,0.2)] lg:h-[32px]'
      )}
    >
      <SearchIcon
        className={cn(
          'size-[1.125rem] text-themeTextGray lg:size-[1.25rem]',
          isLoading && 'animate-spin',
          iconClassName
        )}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="w-full"
      >
        <Input
          id="search"
          value={initialValue}
          onChange={(event) => {
            onSearch?.(event.target.value || null)
          }}
          placeholder={placeholder}
          className={cn(
            'absolute inset-0 -z-10 rounded-3xl',
            'size-full border-0 bg-transparent focus-within:bg-transparent focus:bg-transparent',
            'text-sm lg:text-base',
            inputClassName
          )}
          type="text"
          disabled={isLoading}
        />
      </form>
    </div>
  )
}

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        style={{
          paddingLeft: '50px',
          paddingRight: '0.75rem'
        }}
        className={cn(
          'flex bg-transparent px-3 py-1',
          'text-base md:text-sm',
          'placeholder:text-muted-foreground',
          'shadow-sm transition-colors',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
          'focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'
