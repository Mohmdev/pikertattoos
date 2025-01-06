import { cache } from 'react'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'

import configPromise from '@payload-config'

import { mergeOpenGraph } from '@seo/mergeOpenGraph'
import { getPayload } from 'payload'
import { cn } from '@utils/cn'
import { getServerSideURL } from '@utils/getURL'

import type { Homepage, Media } from '@payload-types'

import { LivePreviewListener } from '@components/dynamic/LivePreviewListener'
import BackdropGradient from '@components/global/backdrop-gradient'
import GradientText from '@components/global/gradient-text'

import { InViewImagesGrid } from './InViewImagesGrid'

// const cachedHomepage = cache(async () => {
//   const payload = await getPayload({ config: configPromise })
//   const doc = await payload.findGlobal({
//     slug: 'homepage',
//     depth: 1,
//     draft: false,
//     select: {
//       title: true,
//       subtitle: true,
//       featured: true
//     }
//   })

//   return doc || null
// })

// const fetchHomepage = async (draft: boolean): Promise<Homepage> => {
//   // const { isEnabled: draft } = await draftMode()
//   const payload = await getPayload({ config })
//   const doc = await payload.findGlobal({
//     slug: 'homepage',
//     depth: 1,
//     draft: draft,
//     overrideAccess: draft,
//     select: {
//       title: true,
//       subtitle: true,
//       featured: true
//     }
//   })

//   return doc
// }

const getHomepage = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const doc = await payload.findGlobal({
    slug: 'homepage',
    depth: 1,
    draft,
    overrideAccess: draft,
    select: {
      title: true,
      subtitle: true,
      featured: true
    }
  })

  return doc
})

// const getHomepage = async () => unstable_cache(fetchHomepage, ['global_homepage'])

// export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  // const getHomepage = draft ? () => fetchHomepage(draft) : cachedHomepage

  // const homepage: Homepage = await getHomepage()

  let page: Homepage | null
  // eslint-disable-next-line prefer-const
  page = await getHomepage()

  if (!page) {
    return {}
  }

  const { title, subtitle, featured: images } = page

  // const { title, subtitle } = homepage
  // const images = homepage.featured as Media[]

  return (
    <div className="flex flex-1 flex-col items-center gap-60 px-0 xl:px-10">
      {draft && <LivePreviewListener />}
      {/* <LivePreviewListener /> */}

      <div className="flex flex-col items-center gap-2">
        <GradientText
          className="text-center text-[40px] font-semibold leading-none md:text-[55px] lg:text-[90px]"
          element="H1"
        >
          {title ? title : 'Nexweb Studio'}
        </GradientText>
        <p className="pt-2 leading-none text-themeTextGray">
          {subtitle ? subtitle : 'Web Technology Solutions'}
        </p>
      </div>
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
          {images &&
            Array.isArray(images) &&
            images.every((item): item is Media => typeof item === 'object' && item !== null) && (
              <InViewImagesGrid images={images} />
            )}
        </div>
      </BackdropGradient>
    </div>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  title: 'TESTING Piker Tattoos Studio',
  description:
    'TESTING Piker Studio, where artistry meets skin! We transform your ideas, blend them with creativity and precision and we create tattoos that tell your unique story.'
}
