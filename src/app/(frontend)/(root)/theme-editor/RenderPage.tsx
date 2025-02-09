'use client'

import React from 'react'

import { cn } from '@utils/cn'

import { Card, CardPostData } from '@components/dynamic/Card'
import { InView } from '../(homepage)/components/in-view'

interface RenderPageProps {
  data: CardPostData[]
  className?: string
}

export const RenderPage: React.FC<RenderPageProps> = (props) => {
  const { data: docs, className } = props

  return (
    <div
      className={cn(
        'container',
        'flex flex-1 flex-col',
        'items-center justify-center',
        'gap-2 px-0 pb-10 pt-8 lg:px-2 lg:pt-28',
        'min-h-full max-w-[100vw]',
        className,
      )}
    >
      {/* Hero Section */}
      <div className="mb-6 flex flex-col items-center gap-3 md:gap-6">
        {/* <RichStyleHeading
          text={heading?.text}
          highlightedText={heading?.highlightedText}
          withGradientBackground={gradientBackground?.enable ?? false}
          neonColors={{
            firstColor: gradientBackground?.firstColor ?? '#00E6BB',
            secondColor: gradientBackground?.secondColor ?? '#008AE6',
            opacity: (gradientBackground?.opacity ?? 100) / 100,
          }}
        />
        {subheading?.text && (
          <TextEffect
            per={subheading?.animateBy ?? 'word'}
            preset={subheading?.animation ?? 'blur'}
            className="leading-none text-themeTextGray"
            delay={subheading?.startDelay ?? 0}
            speedSegment={
              subheading?.animationSpeed ? subheading.animationSpeed / 100 : 1
            }
            speedReveal={subheading?.flowSpeed ? subheading.flowSpeed / 100 : 1}
            once={false}
          >
            {subheading?.text ?? ''}
          </TextEffect>
        )} */}
      </div>

      {/* Dynamic Content Section */}
      <div className="relative w-full">
        {/* Default Grid View */}
        <div
          className={cn(
            'relative flex w-full flex-col items-center overflow-hidden',
          )}
          style={{
            maskImage: `linear-gradient(to right,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.5) 20%,rgba(0, 0, 0, 0.6) 40%,rgba(0, 0, 0, 0.6) 60%,rgba(0, 0, 0, 0.5) 80%, rgba(0, 0, 0, 0))`,
            filter: 'contrast(115%)',
          }}
        >
          <div
            className={cn(
              'overflow-auto',
              'h-max max-w-[1920px]',
              'flex items-end justify-center pb-12',
            )}
          >
            <InView
              viewOptions={{ once: true, margin: '0px 0px -250px 0px' }}
              variants={{
                hidden: {
                  opacity: 0,
                },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.09,
                  },
                },
              }}
            >
              <div
                className={cn(
                  //
                  'w-full',
                  'gap-2 md:gap-2.5',
                  'columns-2 sm:columns-3',
                )}
              >
                {docs?.map((result, index) => {
                  if (typeof result === 'object' && result !== null) {
                    return (
                      <div className="col-span-4" key={index}>
                        <Card
                          className="h-full"
                          doc={result}
                          relationTo="posts"
                          showCategories
                        />
                      </div>
                    )
                  }

                  return null
                })}
              </div>
            </InView>
          </div>
        </div>
      </div>
    </div>
  )
}
