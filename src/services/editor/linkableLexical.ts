import { Config } from 'payload'

import { LINKABLE_COLLECTIONS } from '@lib/constants/constants'

import {
  BoldFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  ParagraphFeature,
  UnderlineFeature
} from '@payloadcms/richtext-lexical'

export const defaultLexical: Config['editor'] = lexicalEditor({
  features: () => {
    return [
      ParagraphFeature(),
      UnderlineFeature(),
      BoldFeature(),
      ItalicFeature(),
      LinkFeature({
        enabledCollections: LINKABLE_COLLECTIONS,
        fields: ({ defaultFields }) => {
          const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
            if ('name' in field && field.name === 'url') return false
            return true
          })

          return [
            ...defaultFieldsWithoutUrl,
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: ({ linkType }) => linkType !== 'internal'
              },
              label: ({ t }) => t('fields:enterURL'),
              required: true
            }
          ]
        }
      })
    ]
  }
})
