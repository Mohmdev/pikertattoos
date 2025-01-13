import { Field } from 'payload'

import { RELATABLE_COLLECTIONS } from '@constants/featureFlags'

export const relatedDocsField: Field = {
  name: 'relatedDocs',
  type: 'relationship',
  relationTo: RELATABLE_COLLECTIONS,
  filterOptions: ({ id }) => {
    return {
      id: {
        not_in: [id]
      }
    }
  },
  hasMany: true,
  admin: {
    position: 'sidebar',
    description:
      "Content that are related to this one. Could be a post, or a tattoo that's featured in this document."
  },
  label: {
    singular: 'Related Content',
    plural: 'Related Content'
  }
}
