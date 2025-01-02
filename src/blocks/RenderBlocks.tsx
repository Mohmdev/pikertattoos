import React, { Fragment } from 'react'

import type { BlockTypes } from './types'

import { BannerBlock } from './BannerBlock'
import { CallToActionBlock } from './CallToActionBlock'
import { MediaBlock } from './MediaBlock'

const blockComponents = {
  bannerBlock: BannerBlock,
  cta: CallToActionBlock,
  mediaBlock: MediaBlock
  // archive: ArchiveBlock,
  // content: ContentBlock,
  // formBlock: FormBlock,
}

export const RenderBlocks: React.FC<{
  blocks: BlockTypes
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
