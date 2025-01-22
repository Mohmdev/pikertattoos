import React, { Fragment } from 'react'

import { ArchiveBlock } from '@blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@blocks/CallToActionBlock/Component'
import { ContentBlock } from '@blocks/ContentBlock/Component'
import { FormBlock } from '@blocks/FormBlock/Component'
import { MediaBlock } from '@blocks/MediaBlock/Component'

import type { Page } from '@payload-types'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock
}

export const RenderBlocks: React.FC<{
  blocks: Page['blocks']
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
                  {/* @ts-expect-error we've already checked blockType exists and matches a component in the blockComponents object. So it's safe to pass the block to the component. */}
                  <Block {...block} />
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
