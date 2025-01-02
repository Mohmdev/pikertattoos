import {
  BlocksFeature,
  BoldFeature,
  EXPERIMENTAL_TableFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  ParagraphFeature,
  UnderlineFeature,
  UploadFeature
} from '@payloadcms/richtext-lexical'
import link from '@fields/link'
import { LabelFeature } from '@fields/richTextField/features/label/server'
import { LargeBodyFeature } from '@fields/richTextField/features/largeBody/server'

import { Config } from 'payload'

import { LINKABLE_COLLECTIONS } from '@constants/featureFlags'

export const advancedLexical: Config['editor'] = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    EXPERIMENTAL_TableFeature(),
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
    }),
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'enableLink',
              type: 'checkbox',
              label: 'Enable Link'
            },
            link({
              appearances: false,
              disableLabel: true,
              overrides: {
                admin: {
                  condition: (_, data) => Boolean(data?.enableLink)
                }
              }
            })
          ]
        }
      }
    }),
    LabelFeature(),
    LargeBodyFeature(),
    BlocksFeature({
      blocks: [
        {
          slug: 'spotlight',
          fields: [
            {
              name: 'element',
              type: 'select',
              options: [
                {
                  label: 'H1',
                  value: 'h1'
                },
                {
                  label: 'H2',
                  value: 'h2'
                },
                {
                  label: 'H3',
                  value: 'h3'
                },
                {
                  label: 'Paragraph',
                  value: 'p'
                }
              ]
            },
            {
              name: 'richText',
              type: 'richText',
              editor: lexicalEditor()
            }
          ],
          interfaceName: 'SpotlightBlock'
        },
        {
          slug: 'video',
          fields: [
            {
              name: 'url',
              type: 'text'
            }
          ],
          interfaceName: 'VideoBlock'
        },
        {
          slug: 'br',
          fields: [
            {
              name: 'ignore',
              type: 'text'
            }
          ],

          interfaceName: 'BrBlock'
        },
        {
          slug: 'commandLine',
          fields: [
            {
              name: 'command',
              type: 'text'
            }
          ],
          interfaceName: 'CommandLineBlock'
        }
        // {
        //   slug: 'templateCards',
        //   fields: [
        //     {
        //       name: 'templates',
        //       type: 'array',
        //       fields: [
        //         {
        //           name: 'name',
        //           type: 'text',
        //           required: true
        //         },
        //         {
        //           name: 'description',
        //           type: 'textarea',
        //           required: true
        //         },
        //         {
        //           name: 'image',
        //           type: 'text',
        //           required: true
        //         },
        //         {
        //           name: 'slug',
        //           type: 'text',
        //           required: true
        //         },
        //         {
        //           name: 'order',
        //           type: 'number',
        //           required: true
        //         }
        //       ],
        //       labels: {
        //         plural: 'Templates',
        //         singular: 'Template'
        //       }
        //     }
        //   ],
        //   interfaceName: 'TemplateCardsBlock'
        // }
        // BannerBlock,
        // CodeBlock,
      ]
    })
  ]
})
