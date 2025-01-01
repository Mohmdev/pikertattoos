import { blockFields } from '@fields/blockFields'

import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    blockFields({
      name: 'mediaBlockFields',
      fields: [
        {
          name: 'position',
          type: 'select',
          defaultValue: 'default',
          options: [
            {
              label: 'Default',
              value: 'default'
            },
            {
              label: 'Wide',
              value: 'wide'
            }
          ]
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true
        },
        {
          name: 'caption',
          type: 'richText'
        }
      ]
    })
  ]
}
