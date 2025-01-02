import { blockFields } from '@fields/blockFields'

import type { Block } from 'payload'

export const SpacerBlock: Block = {
  slug: 'spacer',
  interfaceName: 'SpacerBlock',
  fields: [
    blockFields({
      name: 'SpaceFields',
      fields: [
        {
          name: 'ignore',
          type: 'text'
        }
      ]
    })
  ],
  labels: {
    plural: 'Spacer Blocks',
    singular: 'Spacer Block'
  }
}
