import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor
} from '@payloadcms/richtext-lexical'
import { BannerBlock } from '@blocks/BannerBlock/config'
import { CodeBlock } from '@blocks/CodeBlock/config'
import { MediaBlock } from '@blocks/MediaBlock/config'

import { Config } from 'payload'

export const blogEditor: Config['editor'] = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      BlocksFeature({ blocks: [BannerBlock, CodeBlock, MediaBlock] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      HorizontalRuleFeature()
    ]
  }
})
