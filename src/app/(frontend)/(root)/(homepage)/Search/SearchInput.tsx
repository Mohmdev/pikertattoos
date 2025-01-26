'use client'

import React, { memo, useCallback } from 'react'

import { SearchIcon, X } from 'lucide-react'
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

const Input = memo(
  React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
    ({ className, type, ...props }, ref) => {
      return (
        <input
          type={type}
          style={{
            paddingLeft: '50px',
            paddingRight: '2.5rem'
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
)
Input.displayName = 'Input'

export const SearchInput = memo(
  ({
    className,
    glass,
    iconClassName,
    inputClassName,
    placeholder = 'Search',
    initialValue = '',
    onSearch,
    isLoading = false
  }: Props) => {
    const handleSubmit = useCallback((e: React.FormEvent) => {
      e.preventDefault()
    }, [])

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch?.(event.target.value || null)
      },
      [onSearch]
    )

    const handleClear = useCallback(() => {
      onSearch?.(null)
    }, [onSearch])

    return (
      <div
        className={cn(
          'flex flex-row items-center gap-2',
          glass && 'backdrop--blur__safari bg-clip-padding backdrop-blur-2xl backdrop-filter',
          className,
          'box-content flex w-full max-w-[90%] rounded-3xl border border-themeGray px-5 py-2 pl-4',
          'h-[20px] bg-[rgba(71,58,68,0.2)] lg:h-[32px]',
          'relative'
        )}
      >
        <SearchIcon
          className={cn(
            'size-[1.125rem] text-themeTextGray transition-all lg:size-[1.25rem]',
            isLoading && 'rotate-90 animate-pulse',
            iconClassName
          )}
        />
        <form onSubmit={handleSubmit} className="w-full">
          <Input
            id="search"
            value={initialValue}
            onChange={handleChange}
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
        {initialValue && (
          <button
            onClick={handleClear}
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2',
              'rounded-full p-1 transition-colors',
              'hover:bg-themeGray/30',
              'outline-0 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0',
              'disabled:pointer-events-none'
            )}
            disabled={isLoading}
            type="button"
            aria-label="Clear search"
          >
            <X className="size-4 text-themeTextGray" />
          </button>
        )}
      </div>
    )
  }
)

SearchInput.displayName = 'SearchInput'
