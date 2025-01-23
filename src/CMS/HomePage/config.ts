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
                  name: 'text',
                  type: 'text',
                  defaultValue: 'Web Technology Solutions'
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'animation',
                      type: 'radio',
                      options: [
                        { label: 'Blur In Up', value: 'blurInUp' },
                        { label: 'Fade In', value: 'fadeIn' },
                        { label: 'Blur In', value: 'blurIn' },
                        { label: 'Blur In Down', value: 'blurInDown' },
                        { label: 'Slide Up', value: 'slideUp' },
                        { label: 'Slide Down', value: 'slideDown' },
                        { label: 'Slide Left', value: 'slideLeft' },
                        { label: 'Slide Right', value: 'slideRight' },
                        { label: 'Scale Up', value: 'scaleUp' },
                        { label: 'Scale Down', value: 'scaleDown' }
                      ],
                      defaultValue: 'blurInUp',
                      admin: {
                        layout: 'horizontal'
                      }
                    },
                    {
                      name: 'animateBy',
                      type: 'select',
                      hasMany: false,
                      options: [
                        { label: 'Text', value: 'text' },
                        { label: 'Line', value: 'line' },
                        { label: 'Character', value: 'character' },
                        { label: 'Word', value: 'word' }
                      ],
                      defaultValue: 'character'
                    }
                  ]
                },
                {
                  type: 'row',
                  fields: [
                    {
                      label: 'Animation Speed',
                      name: 'duration',
                      type: 'number',
                      defaultValue: 0.3,
                      min: 0,
                      max: 10,
                      admin: {
                        step: 0.1,
                        placeholder: 'seconds',
                        description: '0 - 10 seconds'
                      }
                    },
                    {
                      name: 'delay',
                      type: 'number',
                      defaultValue: 0,
                      min: 0,
                      max: 10,
                      admin: {
                        step: 0.1,
                        placeholder: 'seconds',
                        description: '0 - 10 seconds'
                      }
                    },
                    {
                      label: 'Animate Once',
                      name: 'once',
                      type: 'checkbox',
                      defaultValue: true,
                      admin: {
                        description:
                          'If enabled, the animation will only play the first time and then stay in place.',
                        style: {
                          justifyContent: 'center'
                        }
                      }
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
                      type: 'select',
                      hasMany: false,
                      options: [
                        { label: 'Aquamarine', value: '#00E6BB' },
                        { label: 'Robin egg blue', value: '#01D7E6' },
                        { label: 'Process Cyan', value: '#00B1E5' },
                        { label: 'Bleu de France', value: '#008AE6' },
                        { label: 'Tang Blue', value: '#015DE5' },
                        { label: 'Palatinate blue', value: '#013AE6' },
                        { label: 'Chrysler blue', value: '#1000E5' },
                        { label: 'Dark violet', value: '#8D00E5' },
                        { label: 'Electric purple', value: '#C900E5' },
                        { label: 'Hollywood cerise', value: '#E600B1' },
                        { label: 'Mexican pink', value: '#E6008A' },
                        { label: 'Raspberry', value: '#E6005D' },
                        { label: 'Crimson', value: '#E6003A' }
                      ],
                      defaultValue: '#00E6BB'
                    },
                    {
                      name: 'secondColor',
                      type: 'select',
                      hasMany: false,
                      options: [
                        { label: 'Aquamarine', value: '#00E6BB' },
                        { label: 'Robin egg blue', value: '#01D7E6' },
                        { label: 'Process Cyan', value: '#00B1E5' },
                        { label: 'Bleu de France', value: '#008AE6' },
                        { label: 'Tang Blue', value: '#015DE5' },
                        { label: 'Palatinate blue', value: '#013AE6' },
                        { label: 'Chrysler blue', value: '#1000E5' },
                        { label: 'Dark violet', value: '#8D00E5' },
                        { label: 'Electric purple', value: '#C900E5' },
                        { label: 'Hollywood cerise', value: '#E600B1' },
                        { label: 'Mexican pink', value: '#E6008A' },
                        { label: 'Raspberry', value: '#E6005D' },
                        { label: 'Crimson', value: '#E6003A' }
                      ],
                      defaultValue: '#008AE6'
                    },
                    {
                      name: 'opacity',
                      label: 'Intensity',
                      type: 'number',
                      defaultValue: 100,
                      min: 0,
                      max: 100,
                      admin: {
                        step: 1,
                        placeholder: '%',
                        description: '0 - 100%'
                      }
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
