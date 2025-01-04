import configPromise from '@payload-config'

import { getPayload } from 'payload'
import { cn } from '@utils/cn'

import type { Payload } from 'payload'

import BackdropGradient from '@components/global/backdrop-gradient'
import GradientText from '@components/global/gradient-text'

import { InViewImagesGrid } from './InViewImagesGrid'

const getTaggedMedia = async (payload: Payload) => {
  const results = await payload.find({
    collection: 'media',
    limit: 21,
    pagination: false,
    where: {
      category: {
        equals: 'tattoo'
      }
    },
    select: {
      url: true,
      alt: true,
      updatedAt: true,
      createdAt: true
    }
  })

  return results || { docs: [] }
}

export default async function HomePage() {
  // const user = await onAuthenticatedUser()
  const payload = await getPayload({ config: configPromise })
  const { docs: images } = await getTaggedMedia(payload)

  return (
    <div className="flex flex-1 flex-col gap-60 px-0 xl:px-10">
      <GradientText
        className="text-center text-[40px] font-semibold leading-none md:text-[55px] lg:text-[90px]"
        element="H1"
      >
        Piker Tattoos
      </GradientText>
      <BackdropGradient
        className={cn(
          'w-full',
          // 'h-full'
          // 'h-3/6 xl:h-2/6'
          'h-3/6 w-4/12 md:w-5/12 xl:h-2/6 xl:w-3/12'
        )}
        container="items-center"
      >
        <div
          className={cn(
            'mb-36',
            'relative flex w-max max-w-full flex-col items-center overflow-x-hidden'
          )}
          style={{
            maskImage: `linear-gradient(to right,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.4) 50%,rgba(0, 0, 0, 0.4) 50%,rgba(0, 0, 0, 0))`
          }}
        >
          <InViewImagesGrid images={images} />
        </div>
      </BackdropGradient>
    </div>
  )
}
