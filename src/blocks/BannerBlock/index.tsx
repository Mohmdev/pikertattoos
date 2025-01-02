import React from 'react'

import type { BannerBlock as BannerBlockTypes } from '@payload-types'

import { Gutter } from '@components/layout/Gutter'

import { BannerBlockContent } from './BannerBlockContent'

type BannerRichTextContent = BannerBlockTypes['bannerFields']['richTextContent']

export type BannerBlockProps = {
  checkmark?: boolean
  children?: React.ReactNode
  richTextContent?: BannerRichTextContent
  icon?: 'checkmark'
  margin?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  marginAdjustment?: any
  bannerType?: BannerBlockTypes['bannerFields']['bannerType']
}

export const BannerBlock: React.FC<{
  bannerFields: BannerBlockTypes['bannerFields']
  disableGutter?: boolean
  marginAdjustment?: boolean
}> = ({ bannerFields, disableGutter, marginAdjustment }) => {
  const bannerData: BannerBlockProps = {
    bannerType: bannerFields.bannerType,
    richTextContent: bannerFields.richTextContent,
    icon: bannerFields.addCheckmark ? 'checkmark' : undefined,
    marginAdjustment
  }

  return (
    <>
      {disableGutter ? (
        <BannerBlockContent {...bannerData} />
      ) : (
        <Gutter>
          <div className={'grid'}>
            <div className={'cols-8 cols-m-6 start-m-2 cols-s-8 start-s-1 start-5'}>
              <BannerBlockContent {...bannerData} />
            </div>
          </div>
        </Gutter>
      )}
    </>
  )
}
