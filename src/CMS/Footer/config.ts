import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { publishedOnly } from '@access/publishedOnly'
import { link } from '@fields/link'
import { getGlobalLivePreviewURL } from '@services/live-preview/getGlobalLivePreviewURL'
import { getGlobalPreviewURL } from '@services/live-preview/getGlobalPreviewURL'
import type { GlobalConfig } from 'payload'
import { revalidateFooter } from './revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: publishedOnly,
    update: isAdminOrEditor,
    readVersions: isAdminOrEditor,
    readDrafts: isAdminOrEditor,
  },
  admin: {
    livePreview: getGlobalLivePreviewURL('footer'),
    preview: getGlobalPreviewURL('footer'),
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
          required: true,
        },
        {
          type: 'array',
          name: 'navItems',
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@CMS/Footer/FooterRowLabel#FooterRowLabel',
            },
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    max: 50,
  },
}
