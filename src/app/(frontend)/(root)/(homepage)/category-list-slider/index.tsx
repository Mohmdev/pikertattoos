'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { UseFormRegister } from 'react-hook-form'

import { Input } from '@ui/input'
import { Label } from '@ui/label'

import 'swiper/css/bundle'

import { SwiperProps, SwiperSlide } from 'swiper/react'

import type { Style } from '@payload-types'

import { GroupListItem } from './list-item'
import { Slider } from './slider'

type Props = {
  overlay?: boolean
  label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  selected?: string
  route?: boolean
  categories: Style[]
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
      {categories.map((style, i) => (
        <SwiperSlide key={style.id} className="content-width-slide">
          {!register ? (
            route ? (
              <div onClick={() => handleCategoryClick(style.title)} className="cursor-pointer">
                <GroupListItem label={style.title} selected={searchParams.get('q') || undefined} />
              </div>
            ) : (
              <GroupListItem label={style.title} />
            )
          ) : (
            i > 0 && (
              <Label htmlFor={`item-${style.id}`}>
                <span>
                  <Input
                    id={`item-${style.id}`}
                    type="radio"
                    className="hidden"
                    value={style.slug}
                    {...register('category')}
                  />
                  <GroupListItem label={style.title} selected={selected} />
                </span>
              </Label>
            )
          )}
        </SwiperSlide>
      ))}
    </Slider>
  )
}
