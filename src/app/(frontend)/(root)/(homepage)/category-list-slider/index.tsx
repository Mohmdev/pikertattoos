'use client'

import Link from 'next/link'

import { UseFormRegister } from 'react-hook-form'

import { Input } from '@ui/input'
import { Label } from '@ui/label'

import 'swiper/css/bundle'

import { SwiperProps, SwiperSlide } from 'swiper/react'
import { PIKER_DATA } from '@lib/tattoo'

import { GroupListItem } from './list-item'
import { Slider } from './slider'

type Props = {
  overlay?: boolean
  label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  selected?: string
  route?: boolean
} & SwiperProps

export const CategoryListSlider = ({
  overlay,
  label,
  register,
  selected,
  route,
  ...rest
}: Props) => {
  return (
    <Slider
      slidesPerView={'auto'}
      spaceBetween={10}
      loop
      freeMode
      label={label}
      overlay={overlay}
      {...rest}
    >
      {PIKER_DATA.groupList.map((item, i) => (
        <SwiperSlide key={item.id} className="content-width-slide">
          {!register ? (
            route ? (
              <Link href={`/explore/${item.path}`}>
                <GroupListItem {...item} selected={selected} />
              </Link>
            ) : (
              <GroupListItem {...item} />
            )
          ) : (
            i > 0 && (
              <Label htmlFor={`item-${item.id}`}>
                <span>
                  <Input
                    id={`item-${item.id}`}
                    type="radio"
                    className="hidden"
                    value={item.path}
                    {...register('category')}
                  />
                  <GroupListItem {...item} selected={selected} />
                </span>
              </Label>
            )
          )}
        </SwiperSlide>
      ))}
    </Slider>
  )
}
