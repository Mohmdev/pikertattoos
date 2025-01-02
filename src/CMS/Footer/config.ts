import link from '@fields/link'

// import { isAdmin } from '@access/isAdmin'

import type { GlobalConfig } from 'payload'

import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { publishedOnly } from '@access/publishedOnly'

import { revalidateFooter } from './revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: publishedOnly,
    update: isAdminOrEditor,
    readVersions: isAdminOrEditor,
    readDrafts: isAdminOrEditor
  },
  fields: [
    {
      type: 'array',
      name: 'columns',
      maxRows: 3,
      minRows: 1,
      fields: [
        {
          type: 'text',
          name: 'label',
          required: true
        },
        {
          type: 'array',
          name: 'navItems',
          fields: [
            link({
              appearances: false
            })
          ]
          // admin: {
          //   initCollapsed: true,
          //   components: {
          //   RowLabel: '@admin-components/RowLabel#RowLabel'
          //   }
          // }
        }
      ]
    }
  ],
  hooks: {
    afterChange: [revalidateFooter]
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100
      }
    }
  }
}
