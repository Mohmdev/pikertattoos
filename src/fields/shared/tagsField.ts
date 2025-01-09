import type { Field } from 'payload'

export const tagsField: Field = {
  name: 'tags',
  type: 'relationship',
  relationTo: 'tag',
  hasMany: true,
  label: 'Tags',
  admin: {
    position: 'sidebar'
  }
}
