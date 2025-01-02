import React from 'react'

import { BlockWrapper } from '@blocks/_shared/BlockWrapper'

import type { PaddingOptions } from '@components/types'
import type { MediaBlock as MediaBlockTypes } from '@payload-types'

import { Media } from '@components/dynamic/Media'
import { BackgroundGrid } from '@components/layout/BackgroundGrid'
import { Gutter } from '@components/layout/Gutter'
import RichText from '@components/RichText'

import classes from './index.module.scss'

export type MediaBlockProps = {
  disableGrid?: boolean
  hideBackground?: boolean
  padding: PaddingOptions
} & MediaBlockTypes

export const MediaBlock: React.FC<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { disableGutter?: boolean; marginAdjustment?: any } & MediaBlockProps
> = ({
  disableGrid = false,
  disableGutter,
  hideBackground,
  marginAdjustment = {},
  mediaBlockFields,
  padding
}) => {
  const { caption, media, position, settings } = mediaBlockFields

  if (typeof media === 'number') {
    return null
  }

  return (
    <BlockWrapper hideBackground={hideBackground} padding={padding} settings={settings}>
      <div
        className={classes.mediaBlock}
        style={{
          marginLeft: marginAdjustment.marginLeft,
          marginRight: marginAdjustment.marginRight
        }}
      >
        {!disableGrid && <BackgroundGrid zIndex={0} />}
        {disableGutter ? (
          <Media
            className={[classes.mediaResource, classes[`position--${position}`]]
              .filter(Boolean)
              .join(' ')}
            resource={media}
          />
        ) : (
          <Gutter className={classes.mediaWrapper}>
            <Media
              className={[classes.mediaResource, classes[`position--${position}`]]
                .filter(Boolean)
                .join(' ')}
              resource={media}
            />

            {caption && (
              <div className={['grid'].filter(Boolean).join(' ')}>
                <div
                  className={[classes.caption, 'cols-8 cols-m-8 start-m-1 start-5']
                    .filter(Boolean)
                    .join(' ')}
                >
                  <small>
                    <RichText data={caption} />
                  </small>
                </div>
              </div>
            )}
          </Gutter>
        )}
      </div>
    </BlockWrapper>
  )
}
