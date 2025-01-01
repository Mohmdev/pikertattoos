'use client'

import React from 'react'

import { ArrowRightIcon, CrosshairIcon } from 'lucide-react'

import { CallToActionBlock as CallToActionBlockTypes } from '@payload-types'
import type { PaddingOptions } from '@components/types'

import { CMSLink } from '@components/dynamic/CMSLink/advanced'
import { CommandLine } from '@components/dynamic/CommandLine'
import { Media } from '@components/dynamic/Media'
import BackgroundGradient from '@components/layout/BackgroundGradient'
import { BackgroundGrid } from '@components/layout/BackgroundGrid'
import { BackgroundScanline } from '@components/layout/BackgroundScanline'
import { Gutter } from '@components/layout/Gutter'
import RichText from '@components/RichText'

import { BlockWrapper } from '../_shared/BlockWrapper'
import classes from './index.module.scss'

export type CallToActionProps = {
  hideBackground?: boolean
  padding?: PaddingOptions
} & CallToActionBlockTypes

export const CallToActionBlock: React.FC<CallToActionProps> = (props) => {
  const {
    ctaFields: {
      bannerImage,
      bannerLink,
      commandLine,
      gradientBackground,
      links,
      richText,
      settings,
      style = 'buttons'
    },
    hideBackground,
    padding
  } = props

  const hasLinks = links && links.length > 0

  return (
    <BlockWrapper
      hideBackground={hideBackground}
      padding={style === 'banner' ? { bottom: 'large', top: 'large' } : padding}
      settings={settings}
    >
      <BackgroundGrid zIndex={0} />
      <Gutter className={classes.callToAction}>
        {style === 'buttons' && (
          <div className={[classes.wrapper].filter(Boolean).join(' ')}>
            <div className={[classes.container, 'grid'].filter(Boolean).join(' ')}>
              <div
                className={[classes.contentWrapper, 'cols-6 cols-m-8'].filter(Boolean).join(' ')}
              >
                <RichText className={classes.content} data={richText} />
                {commandLine && <CommandLine command={commandLine} />}
              </div>
              <div
                className={[classes.linksContainer, 'cols-8 cols-m-8 start-m-1 start-9 grid']
                  .filter(Boolean)
                  .join(' ')}
              >
                <BackgroundScanline
                  className={[classes.scanline, 'cols-16 cols-m-8 start-m-1 start-5']
                    .filter(Boolean)
                    .join(' ')}
                  crosshairs={['top-left', 'bottom-left']}
                />

                <CrosshairIcon className={[classes.crosshairTopLeft].filter(Boolean).join(' ')} />
                <CrosshairIcon
                  className={[classes.crosshairBottomRight].filter(Boolean).join(' ')}
                />

                {hasLinks && (
                  <div className={[classes.links, 'cols-16 cols-m-8'].filter(Boolean).join(' ')}>
                    {links.map((link, index) => {
                      return (
                        <CMSLink
                          {...link}
                          appearance={'default'}
                          buttonProps={{
                            appearance: 'default',
                            forceBackground: true,
                            hideBottomBorderExceptLast: true,
                            hideHorizontalBorders: true,
                            size: 'large'
                          }}
                          className={[classes.button].filter(Boolean).join(' ')}
                          key={index}
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {style === 'banner' && (
          <CMSLink
            {...bannerLink}
            className={[classes.bannerWrapper, 'grid'].filter(Boolean).join(' ')}
            label={null}
          >
            <div className={[classes.bannerContent, 'cols-8'].filter(Boolean).join(' ')}>
              <RichText data={richText} />
              <span className={classes.bannerLink}>
                {bannerLink?.label}
                <ArrowRightIcon />
              </span>
            </div>
            {bannerImage && typeof bannerImage !== 'string' && (
              <div className={[classes.bannerImage, 'cols-8'].filter(Boolean).join(' ')}>
                <Media resource={bannerImage} />
              </div>
            )}
            {gradientBackground ? (
              <BackgroundGradient className={classes.bannerGradient} />
            ) : (
              <BackgroundScanline className={classes.bannerScanline} />
            )}
          </CMSLink>
        )}
      </Gutter>
    </BlockWrapper>
  )
}
