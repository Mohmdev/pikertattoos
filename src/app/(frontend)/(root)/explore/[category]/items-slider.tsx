import { SwiperSlide } from 'swiper/react'

import { mockTattooItems } from '@lib/tattoo/mock-tattoos'

import type { GroupStateProps } from '@lib/data/types'

// import { useExploreSlider, useGroupList } from "@/hooks/groups"
// import { useAppSelector } from "@/redux/store"

import Skeleton from '@components/global/skeleton'
import { Slider } from '@components/global/slider'

import { ItemCard } from './item-card'

type Props = {
  query: string
  label: string
  text: string
}

export const ItemsSlider = ({
  // query,
  label,
  text
}: Props) => {
  // Mock implementation of hooks
  const { groups, status } = {
    groups: mockTattooItems,
    status: 200
  }
  // const { groups, status } = useGroupList(query)

  const {
    refetch,
    isFetching,
    data: fetchedData,
    onLoadSlider
  } = {
    refetch: () => console.log('Mock refetch'),
    isFetching: false,
    data: { status: 200 },
    onLoadSlider: true
  }
  // const {
  //   refetch,
  //   isFetching,
  //   data: fetchedData,
  //   onLoadSlider
  // } = useExploreSlider(query, groups && groups.length)

  // const { data } = useAppSelector((state) => state.infiniteScrollReducer)
  const { data } = { data: [] }

  return (
    status === 200 &&
    groups.length > 0 &&
    onLoadSlider && (
      <div className="mt-16 flex flex-col">
        <div className="flex flex-col px-[40px] lg:px-[150px]">
          <h2 className="text-2xl font-bold text-white">{label}</h2>
          <p className="text-sm text-themeTextGray">{text}</p>
        </div>
        <Slider
          freeMode
          className="flex"
          spaceBetween={50}
          autoHeight
          onReachEnd={() => refetch()}
          breakpoints={{
            200: {
              slidesPerView: 1.2,
              slidesOffsetBefore: 40,
              slidesOffsetAfter: 40
            },
            820: {
              slidesPerView: 2.4,
              slidesOffsetBefore: 40,
              slidesOffsetAfter: 40
            },
            1024: {
              slidesPerView: 3.2,
              slidesOffsetBefore: 150,
              slidesOffsetAfter: 150
            },
            1280: {
              slidesPerView: 4.3,
              slidesOffsetBefore: 150,
              slidesOffsetAfter: 150
            },
            1540: {
              slidesPerView: 5.6,
              slidesOffsetBefore: 150,
              slidesOffsetAfter: 150
            }
          }}
        >
          {groups.map((group) => (
            <SwiperSlide key={group.id}>
              <ItemCard {...group} />
            </SwiperSlide>
          ))}
          {fetchedData?.status === 200 &&
            data.map((group: GroupStateProps) => (
              <SwiperSlide key={group.id}>
                <ItemCard {...group} />
              </SwiperSlide>
            ))}
          {isFetching && (
            <SwiperSlide>
              <Skeleton element="CARD" />
            </SwiperSlide>
          )}
        </Slider>
      </div>
    )
  )
}
