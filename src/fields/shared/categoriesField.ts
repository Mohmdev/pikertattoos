import type { Field } from 'payload'

export const categoriesField: Field = {
  name: 'categories',
  type: 'relationship',
  relationTo: ['area', 'style'],
  hasMany: true,
  label: {
    singular: 'Category',
    plural: 'Categories'
  }
}
