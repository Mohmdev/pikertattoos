import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { Config } from 'payload'

export const formsLexical: Config['editor'] = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      HeadingFeature({
        enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4']
      }),
      FixedToolbarFeature()
    ]
  }
})
