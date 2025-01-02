import { lexicalEditor } from '@payloadcms/richtext-lexical'

import type { Block } from 'payload'

export const UploadBlock: Block = {
  slug: 'upload',
  fields: [
    {
      name: 'src',
      type: 'text',
      required: true
    },
    {
      name: 'alt',
      type: 'text'
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => defaultFeatures
      })
    }
  ],
  interfaceName: 'UploadBlock'
}
