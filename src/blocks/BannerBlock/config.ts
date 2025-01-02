import { blockFields } from '@fields/blockFields'

import type { Block } from 'payload'

export const BannerBlock: Block = {
  slug: 'banner',
  interfaceName: 'BannerBlock',
  fields: [
    blockFields({
      name: 'bannerFields',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'bannerType',
              type: 'select',
              admin: {
                width: '50%'
              },
              defaultValue: 'default',
              options: [
                {
                  label: 'Default',
                  value: 'default'
                },
                {
                  label: 'Info',
                  value: 'info'
                },
                {
                  label: 'Success',
                  value: 'success'
                },
                {
                  label: 'Warning',
                  value: 'warning'
                },
                {
                  label: 'Alert',
                  value: 'alert'
                },
                {
                  label: 'Error',
                  value: 'error'
                }
              ]
            },
            {
              name: 'addCheckmark',
              type: 'checkbox',
              admin: {
                style: {
                  alignSelf: 'center'
                },
                width: '50%'
              }
            }
          ]
        },
        {
          name: 'richTextContent',
          type: 'richText',
          required: true
        }
      ]
    })
  ],
  jsx: {
    export: ({ fields, lexicalToMarkdown }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const props: any = {}
      if (fields.type) {
        props.type = fields.type
      }

      return {
        children: lexicalToMarkdown ? lexicalToMarkdown({ editorState: fields.content }) : '',
        props
      }
    },
    import: ({ children, markdownToLexical, props }) => {
      return {
        type: props?.type ?? 'success',
        content: markdownToLexical ? markdownToLexical({ markdown: children }) : undefined
      }
    }
  }
}
