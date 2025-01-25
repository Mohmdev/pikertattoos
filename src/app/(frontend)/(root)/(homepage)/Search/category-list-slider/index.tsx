'use client'

import { useCallback, useMemo } from 'react'

import { SwiperProps, SwiperSlide } from 'swiper/react'

import type { Area, Style, Tag } from '@payload-types'

import { Slider } from './slider'

import 'swiper/css/bundle'

import { CategoryButton } from './category-button'

type Props = {
  overlay?: boolean
  label?: string
  route?: boolean
  categories: (
    | { relationTo: 'style'; value: number | Style }
    | { relationTo: 'tag'; value: number | Tag }
    | { relationTo: 'area'; value: number | Area }
  )[]
  onSearch?: (query: string | null) => void
  isLoading?: boolean
  selectedQuery?: string | null
} & SwiperProps

export const CategoryListSlider = ({
  overlay,
  label,
  route,
  categories,
  onSearch,
  isLoading,
  selectedQuery,
  ...rest
}: Props) => {
  const handleCategoryClick = useCallback(
    (title: string) => {
      // If the category is already selected, clear it
      if (selectedQuery === title) {
        onSearch?.(null)
      } else {
        onSearch?.(title)
      }
    },
    [selectedQuery, onSearch]
  )

  const categorySlides = useMemo(
    () =>
      categories.map((item) => {
        const data = item.value as Style | Tag | Area
        return (
          <SwiperSlide key={data.id} className="content-width-slide">
            {route ? (
              <CategoryButton
                label={data.title}
                selected={selectedQuery}
                onClick={() => handleCategoryClick(data.title)}
                isLoading={isLoading}
              />
            ) : (
              <CategoryButton label={data.title} />
            )}
          </SwiperSlide>
        )
      }),
    [categories, route, selectedQuery, isLoading, handleCategoryClick]
  )

  return (
    <Slider
      slidesPerView={'auto'}
      loop
      freeMode
      label={label}
      overlay={overlay}
      className="*:gap-2"
      {...rest}
    >
      {categorySlides}
    </Slider>
  )
}
