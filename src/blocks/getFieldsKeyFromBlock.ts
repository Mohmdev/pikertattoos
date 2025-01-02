import type { BlockTypes } from './types'

/**
 * Get the key of the fields from the block
 */
export function getFieldsKeyFromBlock(block: BlockTypes): string {
  if (!block) {
    return ''
  }

  const keys = Object.keys(block)

  const key = keys.find((value) => {
    return value.endsWith('Fields')
  })

  return key ?? ''
}
