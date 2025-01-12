'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { SearchIcon } from 'lucide-react'
import { cn } from '@utils/cn'
import { useDebounce } from '@utils/useDebounce'

import { Input } from '@ui/input'

import { CardDocData } from '../tattoos/Card'

type Props = {
  className?: string
  inputClassName?: string
  placeholder?: string
  // searchType: 'GROUPS' | 'POSTS'
  iconClassName?: string
  glass?: boolean
  initialValue?: string
  onResultsChange?: (results: CardDocData[] | null) => void
}

export const Search = ({
  // searchType,
  className,
  glass,
  iconClassName,
  inputClassName,
  placeholder = 'Search',
  initialValue = '',
  onResultsChange
}: Props) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState(initialValue)
  const debouncedValue = useDebounce(value)

  console.log('Search - value:', value)
  console.log('Search - debouncedValue:', debouncedValue)

  useEffect(() => {
    async function fetchResults() {
      if (debouncedValue) {
        setIsLoading(true)
        try {
          onResultsChange?.(null)
          router.push(`/?q=${encodeURIComponent(debouncedValue)}`, {
            scroll: false
          })
        } catch (error) {
          console.error('Search error:', error)
          onResultsChange?.(null)
        } finally {
          setIsLoading(false)
        }
      } else {
        onResultsChange?.(null)
        router.push('/', {
          scroll: false
        })
      }
    }

    fetchResults()
  }, [debouncedValue, router, onResultsChange])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className={cn(
          'flex items-center gap-2 border-2',
          className,
          glass &&
            'backdrop--blur__safari bg-opacity-20 bg-clip-padding backdrop-blur-2xl backdrop-filter'
        )}
      >
        <SearchIcon
          className={cn(iconClassName || 'text-themeTextGray', isLoading && 'animate-spin')}
        />
        <Input
          id="search"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder={placeholder}
          className={cn('border-0 bg-transparent', inputClassName)}
          type="text"
          disabled={isLoading}
        />
      </form>
    </div>
  )
}
