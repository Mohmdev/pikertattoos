'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { UseFormRegister } from 'react-hook-form'

import { Input } from '@ui/input'
import { Label } from '@ui/label'

import 'swiper/css/bundle'

import { SwiperProps, SwiperSlide } from 'swiper/react'

import type { Area, Style, Tag } from '@payload-types'

import { GroupListItem } from './list-item'
import { Slider } from './slider'

type Props = {
  overlay?: boolean
  label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  selected?: string
  route?: boolean
  categories: (
    | { relationTo: 'style'; value: number | Style }
    | { relationTo: 'tag'; value: number | Tag }
    | { relationTo: 'area'; value: number | Area }
  )[]
} & SwiperProps

export const CategoryListSlider = ({
  overlay,
  label,
  register,
  selected,
  route,
  categories,
  ...rest
}: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryClick = (title: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('q', title)
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
      {categories.map((item, i) => {
        const data = item.value as Style | Tag | Area
        return (
          <SwiperSlide key={data.id} className="content-width-slide">
            {!register ? (
              route ? (
                <div onClick={() => handleCategoryClick(data.title)} className="cursor-pointer">
                  <GroupListItem label={data.title} selected={searchParams.get('q') || undefined} />
                </div>
              ) : (
                <GroupListItem label={data.title} />
              )
            ) : (
              i > 0 && (
                <Label htmlFor={`item-${data.id}`}>
                  <span>
                    <Input
                      id={`item-${data.id}`}
                      type="radio"
                      className="hidden"
                      value={data.slug}
                      {...register('category')}
                    />
                    <GroupListItem label={data.title} selected={selected} />
                  </span>
                </Label>
              )
            )}
          </SwiperSlide>
        )
      })}
    </Slider>
  )
}
