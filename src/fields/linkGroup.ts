import { link } from '@fields/link'

import deepMerge from '@utils/deepMerge'

import type { LinkAppearances } from '@fields/link'
import type { ArrayField, Field } from 'payload'

type LinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false
  overrides?: Partial<ArrayField>
}) => Field

const linkGroup: LinkGroupType = ({ appearances, overrides = {} } = {}) => {
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

export default linkGroup
