import { createServerFeature } from '@payloadcms/richtext-lexical'
import { LabelNode } from '@fields/richTextField/features/label/LabelNode'

export const LabelFeature = createServerFeature({
  feature: {
    ClientFeature: '@fields/richTextField/features/label/client#LabelFeatureClient',
    nodes: [
      {
        node: LabelNode
      }
    ]
  },
  key: 'label'
})
