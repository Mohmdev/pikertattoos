import { isAdmin } from '@access/isAdmin'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { publishedOnly } from '@access/publishedOnly'
import { authorsField } from '@fields/shared/authorsField'
import { noindexField } from '@fields/shared/noindexField'
import { populateAuthorsField } from '@fields/shared/populatedAuthorsField'
import { publishedAtField } from '@fields/shared/publishedAtField'
import { seoTab } from '@fields/shared/seoTab'
import { getGlobalLivePreviewURL } from '@services/live-preview/getGlobalLivePreviewURL'
import { getGlobalPreviewURL } from '@services/live-preview/getGlobalPreviewURL'
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
    readDrafts: isAdminOrEditor,
  },
  admin: {
    preview: getGlobalPreviewURL('homepage'),
    livePreview: getGlobalLivePreviewURL('homepage'),
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
                      defaultValue: 'Nexweb',
                    },
                    {
                      name: 'highlightedText',
                      type: 'text',
                      defaultValue: 'Studio',
                    },
                  ],
                },
              ],
              admin: {
                style: {
                  marginTop: '2.5rem',
                  marginBottom: '0',
                },
              },
            },
            {
              name: 'subheading',
              type: 'group',
              admin: {
                style: {
                  marginTop: '2rem',
                  marginBottom: '0',
                },
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'Web Technology Solutions',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'animation',
                      type: 'select',
                      hasMany: false,
                      options: [
                        { label: 'Blur', value: 'blur' },
                        { label: 'Fade In Blur', value: 'fadeInBlur' },
                        { label: 'Scale', value: 'scale' },
                        { label: 'Fade', value: 'fade' },
                        { label: 'Slide', value: 'slide' },
                      ],
                      defaultValue: 'fadeInBlur',
                      admin: {
                        description: 'How the text should animate.',
                      },
                    },
                    {
                      name: 'animateBy',
                      type: 'select',
                      hasMany: false,
                      options: [
                        { label: 'whole Line', value: 'line' },
                        { label: 'each Word', value: 'word' },
                        { label: 'each Character', value: 'character' },
                      ],
                      defaultValue: 'character',
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'animationSpeed',
                      label: 'Animation Speed',
                      type: 'number',
                      min: 5,
                      max: 100,
                      admin: {
                        step: 5,
                        description:
                          'Controls how fast each element appears. Lower = slower animation.',
                        placeholder: '100%',
                      },
                    },
                    {
                      name: 'flowSpeed',
                      label: 'Flow Speed',
                      type: 'number',
                      min: 5,
                      max: 100,
                      admin: {
                        step: 5,
                        description:
                          'Controls the spacing between animations. Lower = more spacing.',
                        placeholder: '100%',
                      },
                    },
                    {
                      name: 'startDelay',
                      label: 'Start Delay',
                      type: 'number',
                      min: 0,
                      max: 5,
                      admin: {
                        step: 0.2,
                        description:
                          'Delay before animation starts (in seconds)',
                        placeholder: '0s',
                      },
                    },
                    {
                      name: 'once',
                      type: 'checkbox',
                      label: 'Play Once',
                      defaultValue: true,
                      admin: {
                        description:
                          'When enabled, the animation will only play the first time it appears on screen.',
                        style: {
                          justifyContent: 'center',
                        },
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'gradientBackground',
              type: 'group',
              admin: {
                style: {
                  marginTop: '2rem',
                  marginBottom: '0',
                },
              },
              fields: [
                {
                  name: 'enable',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'The animating gradient background.',
                  },
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
                        { label: 'Crimson', value: '#E6003A' },
                      ],
                      defaultValue: '#00E6BB',
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
                        { label: 'Crimson', value: '#E6003A' },
                      ],
                      defaultValue: '#008AE6',
                    },
                    {
                      name: 'opacity',
                      label: 'Intensity',
                      type: 'number',
                      defaultValue: 80,
                      min: 0,
                      max: 100,
                      admin: {
                        step: 1,
                        placeholder: '%',
                        description: '0 - 100%',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'search',
              type: 'group',
              fields: [
                {
                  name: 'placeholderText',
                  type: 'text',
                  defaultValue: 'Search for anything',
                  admin: {
                    description:
                      'The static text that appears in the search bar.',
                  },
                },
                {
                  name: 'enableFilters',
                  label: 'Search Filters',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Toggle the search filters component.',
                  },
                },
                {
                  name: 'filterOptions',
                  type: 'relationship',
                  relationTo: ['style', 'tag', 'area'],
                  hasMany: true,
                  label: {
                    singular: 'Filter',
                    plural: 'Filters',
                  },
                  admin: {
                    description:
                      'Options that will be displayed as filter buttons.',
                  },
                },
              ],
              admin: {
                style: {
                  marginTop: '2.5rem',
                  marginBottom: '0',
                },
              },
            },
            {
              name: 'gridView',
              type: 'group',
              fields: [
                {
                  name: 'featuredPosts',
                  type: 'relationship',
                  relationTo: 'tattoo',
                  hasMany: true,
                  minRows: 6,
                  maxRows: 36,
                  admin: {
                    description:
                      'The posts that you would like to feature on the homepage. Pick a minimum of 6 and a maximum of 36 posts.',
                  },
                },
              ],
              admin: {
                style: {
                  marginTop: '2rem',
                  marginBottom: '0',
                },
              },
            },
          ],
        },
        seoTab,
      ],
    },
    noindexField,
    authorsField,
    populateAuthorsField,
    publishedAtField,
  ],
  hooks: {
    afterChange: [revalidateHomepage],
    afterRead: [populateAuthors],
    beforeChange: [populatePublishedAt],
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
