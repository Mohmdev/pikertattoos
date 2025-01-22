import { link } from '@fields/link'

import deepMerge from '@utils/deepMerge'

import type { LinkAppearances } from '@fields/link'
import type { ArrayField, Field } from 'payload'

type LinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false
  overrides?: Partial<ArrayField>
}) => Field

export const linkGroup: LinkGroupType = ({ appearances, overrides = {} } = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    type: 'array',
    fields: [
      link({
        appearances
      })
    ],
    admin: {
      initCollapsed: false
    }
  }

  return deepMerge(generatedLinkGroup, overrides)
}
