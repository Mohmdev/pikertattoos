import type { FeatureProviderServer } from '@payloadcms/richtext-lexical'
import type { RichTextField } from 'payload'

type RichTextTypes = (
  overrides?: Partial<RichTextField>,
  additionalFeatures?: FeatureProviderServer[]
) => RichTextField

export const richTextField: RichTextTypes = (overrides = {}): RichTextField => {
  const overridesToMerge = overrides ? overrides : {}

  return {
    name: 'richText',
    type: 'richText',
    required: true,
    ...overridesToMerge
  }
}
