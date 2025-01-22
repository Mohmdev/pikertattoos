import type { Data } from './Component'
import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'

export const buildInitialFormState = (fields?: FormFieldBlock[]): Data => {
  if (!fields) return {}

  return fields.reduce<Data>((initialSchema, field) => {
    const { blockType } = field
    if (!('name' in field)) return initialSchema

    const { name } = field
    switch (blockType) {
      case 'checkbox':
        return {
          ...initialSchema,
          [name]: { value: field.defaultValue ?? false }
        }
      case 'country':
      case 'email':
      case 'text':
      case 'select':
      case 'state':
      case 'textarea':
      case 'message':
      case 'payment':
        return {
          ...initialSchema,
          [name]: { value: '' }
        }
      default:
        return initialSchema
    }
  }, {})
}
