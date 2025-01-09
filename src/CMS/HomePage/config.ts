import { generateGlobalPreviewPath } from '@services/preview/generateGlobalPreviewPath'
import { authorsField } from '@fields/shared/authorsField'
import { noindexField } from '@fields/shared/noindexField'
import { publishedAtField } from '@fields/shared/publishedAtField'
import { seoTab } from '@fields/shared/seoTab'
import { isAdmin } from '@access/isAdmin'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { publishedOnly } from '@access/publishedOnly'

import { getServerSideURL } from '@utils/getURL'

import type { GlobalConfig } from 'payload'

import { revalidateHomepage } from './revalidateHomepage'

export const HomePage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: publishedOnly,
    update: isAdmin,
    readVersions: isAdminOrEditor,
    readDrafts: isAdminOrEditor
  },
  admin: {
    livePreview: {
      url: ({ req }) => {
        return generateGlobalPreviewPath({
          global: 'homepage',
          slug: 'home',
          req
        })
      }
    },
    preview: () => {
      return `${getServerSideURL()}`
    }
  },
  label: 'Home Page',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true
                },
                {
                  name: 'subtitle',
                  type: 'text'
                }
              ]
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'featured',
                  type: 'relationship',
                  relationTo: 'tattoo',
                  hasMany: true,
                  minRows: 6,
                  maxRows: 18
                }
              ]
            }
          ]
        },
        seoTab
      ]
    },
    noindexField,
    authorsField,
    publishedAtField
  ],
  hooks: {
    afterChange: [revalidateHomepage]
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100
      }
      // validate: true
    },
    max: 50
  }
}
