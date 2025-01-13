import React from 'react'

import { BlockWrapper } from '@blocks/_shared/BlockWrapper'

import { cn } from '@utils/cn'

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
  padding?: PaddingOptions
  captionClassName?: string
  disableInnerContainer?: boolean
  className?: string
  imgClassName?: string
} & MediaBlockTypes

export const MediaBlock: React.FC<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { disableGutter?: boolean; marginAdjustment?: any } & MediaBlockProps
> = ({
  captionClassName,
  disableGrid = false,
  disableGutter,
  hideBackground,
  marginAdjustment = {},
  mediaBlockFields,
  padding,
  disableInnerContainer,
  className,
  imgClassName
}) => {
  const { caption, media, position, settings } = mediaBlockFields

  if (typeof media === 'number') {
    return null
  }

  return (
    <BlockWrapper hideBackground={hideBackground} padding={padding} settings={settings}>
      <div
        className={cn(classes.mediaBlock, className)}
        style={{
          marginLeft: marginAdjustment.marginLeft,
          marginRight: marginAdjustment.marginRight
        }}
      >
        {!disableGrid && <BackgroundGrid zIndex={0} />}
        {disableGutter ? (
          <Media
            className={cn(classes.mediaResource, classes[`position--${position}`], imgClassName)}
            resource={media}
          />
        ) : (
          <Gutter className={classes.mediaWrapper}>
            <Media
              className={cn(classes.mediaResource, classes[`position--${position}`], imgClassName)}
              resource={media}
            />

            {caption && (
              <div
                className={cn('grid', {
                  container: !disableInnerContainer
                })}
              >
                <div
                  className={cn(
                    classes.caption,
                    'cols-8 cols-m-8 start-m-1 start-5',

                    captionClassName
                  )}
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
