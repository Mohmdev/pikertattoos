'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { SearchIcon } from 'lucide-react'
import { cn } from '@utils/cn'
import { useDebounce } from '@utils/useDebounce'

import { Input } from '@ui/input'

type Props = {
  className?: string
  inputClassName?: string
  placeholder?: string
  // searchType: 'GROUPS' | 'POSTS'
  iconClassName?: string
  glass?: boolean
}

export const Search = ({
  // searchType,
  className,
  glass,
  iconClassName,
  inputClassName,
  placeholder = 'Search'
}: Props) => {
  const router = useRouter()

  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value)

  useEffect(() => {
    router.push(`/${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [debouncedValue, router])

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
        <SearchIcon type="submit" className={cn(iconClassName || 'text-themeTextGray')} />
        <Input
          id="search"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          // onChange={onSearchQuery}
          // value={query}
          placeholder={placeholder}
          className={cn('border-0 bg-transparent', inputClassName)}
          type="text"
        />
        {/* <button type="submit" className="sr-only">
          submit
        </button> */}
      </form>
    </div>
  )
}
