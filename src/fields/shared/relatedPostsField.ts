import type { Field } from 'payload'

import { RELATED_POSTS_COLLECTIONS } from '@constants/featureFlags'

export const relatedPostsField: Field = {
  name: 'relatedPosts',
  type: 'relationship',
  relationTo: RELATED_POSTS_COLLECTIONS,
  admin: {
    description:
      "Posts that are related to this one. Could be a post, or a tattoo that's featured in this post."
  },
  filterOptions: ({ id }) => {
    return {
      id: {
        not_in: [id]
      }
    }
  },
  hasMany: true,
  label: {
    singular: 'Related Post',
    plural: 'Related Posts'
  }
}