import { generateGlobalPreviewPath } from '@services/preview/generateGlobalPreviewPath'
import { authorsField } from '@fields/shared/authorsField'
import { noindexField } from '@fields/shared/noindexField'
import { populateAuthorsField } from '@fields/shared/populatedAuthorsField'
import { publishedAtField } from '@fields/shared/publishedAtField'
import { seoTab } from '@fields/shared/seoTab'
import { isAdmin } from '@access/isAdmin'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { publishedOnly } from '@access/publishedOnly'

import { getServerSideURL } from '@utils/getURL'

import type { GlobalConfig } from 'payload'

import { populateAuthors } from './populateAuthors'
import { populatePublishedAt } from './populatePublishedAt'
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
          label: 'Customize',
          fields: [
            {
              name: 'heading',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      defaultValue: 'Nexweb'
                    },
                    {
                      name: 'highlightedText',
                      type: 'text',
                      defaultValue: 'Studio'
                    }
                  ]
                }
              ],
              admin: {
                style: {
                  marginTop: '2.5rem',
                  marginBottom: '0',
                  paddingBottom: '1rem'
                }
              }
            },
            {
              name: 'subheading',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      defaultValue: 'Web Technology Solutions'
                    }
                  ]
                }
              ],
              admin: {
                style: {
                  marginTop: '0.5rem',
                  marginBottom: '0'
                }
              }
            },
            {
              name: 'gradientBackground',
              type: 'group',
              fields: [
                {
                  name: 'enable',
                  type: 'checkbox',
                  defaultValue: true
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'firstColor',
                      type: 'radio',
                      options: [
                        '#00E6BB',
                        '#01D7E6',
                        '#00B1E5',
                        '#008AE6',
                        '#015DE5',
                        '#013AE6',
                        '#1000E5',
                        '#4B00E5',
                        '#8D00E5',
                        '#C900E5',
                        '#E600B1',
                        '#E6008A',
                        '#E6005D',
                        '#E6003A'
                      ],
                      defaultValue: '#00E6BB'
                    },
                    {
                      name: 'secondColor',
                      type: 'radio',
                      options: [
                        '#00E6BB',
                        '#01D7E6',
                        '#00B1E5',
                        '#008AE6',
                        '#015DE5',
                        '#013AE6',
                        '#1000E5',
                        '#4B00E5',
                        '#8D00E5',
                        '#C900E5',
                        '#E600B1',
                        '#E6008A',
                        '#E6005D',
                        '#E6003A'
                      ],
                      defaultValue: '#008AE6'
                    },
                    {
                      name: 'opacity',
                      label: 'Intensity',
                      type: 'number',
                      defaultValue: 1,
                      min: 0,
                      max: 1
                    }
                  ]
                }
              ],
              admin: {
                style: {
                  marginTop: '0.5rem',
                  marginBottom: '0'
                }
              }
            },
            {
              name: 'search',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'inputText',
                      type: 'text',
                      defaultValue: 'Search for anything'
                    }
                  ]
                }
              ],
              admin: {
                style: {
                  marginTop: '0.5rem',
                  marginBottom: '0'
                }
              }
            },
            {
              name: 'featured',
              type: 'relationship',
              relationTo: 'tattoo',
              hasMany: true,
              minRows: 6,
              maxRows: 18
            }
          ]
        },
        seoTab
      ]
    },
    noindexField,
    authorsField,
    populateAuthorsField,
    publishedAtField
  ],
  hooks: {
    afterChange: [revalidateHomepage],
    afterRead: [populateAuthors],
    beforeChange: [populatePublishedAt]
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
