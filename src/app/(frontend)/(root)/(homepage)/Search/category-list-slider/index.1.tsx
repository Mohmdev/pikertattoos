'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { SwiperProps, SwiperSlide } from 'swiper/react'

import type { Area, Style, Tag } from '@payload-types'

import { GroupListItem } from './list-item'
import { Slider } from './slider'

import 'swiper/css/bundle'

type Props = {
  overlay?: boolean
  label?: string
  route?: boolean
  categories: (
    | { relationTo: 'style'; value: number | Style }
    | { relationTo: 'tag'; value: number | Tag }
    | { relationTo: 'area'; value: number | Area }
  )[]
} & SwiperProps

export const CategoryListSlider = ({ overlay, label, route, categories, ...rest }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryClick = (title: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const currentQuery = params.get('q')

    if (currentQuery === title) {
      params.delete('q')
    } else {
      params.set('q', title)
    }

    router.push(`/?${params.toString()}`)
  }

  return (
    <Slider
      slidesPerView={'auto'}
      loop
      freeMode
      label={label}
      overlay={overlay}
      // spaceBetween={8}
      className="*:gap-2" // Use className because spaceBetween gets applied after DOM is rendered resulting in an ugly initial render
      {...rest}
    >
      {categories.map((item) => {
        const data = item.value as Style | Tag | Area
        return (
          <SwiperSlide key={data.id} className="content-width-slide">
            {route ? (
              <div onClick={() => handleCategoryClick(data.title)} className="cursor-pointer">
                <GroupListItem label={data.title} selected={searchParams.get('q') || undefined} />
              </div>
            ) : (
              <GroupListItem label={data.title} />
            )}
          </SwiperSlide>
        )
      })}
    </Slider>
  )
}
