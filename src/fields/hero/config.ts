// import { themeField } from '@fields/blockFields'
import { link } from '@fields/link'
import linkGroup from '@fields/linkGroup'

import type { Field } from 'payload'

export const heroFields: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'default',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none'
        },
        {
          label: 'Default',
          value: 'default'
        },
        {
          label: 'Home 1.0',
          value: 'homeOne'
        },
        {
          label: 'Home 2.0',
          value: 'homeTwo'
        },
        {
          label: 'Home 3.0',
          value: 'homeThree'
        },
        {
          label: 'Content and Media',
          value: 'contentMedia'
        },
        {
          label: 'Centered Content',
          value: 'centeredContent'
        },
        {
          label: 'Gradient',
          value: 'gradient'
        },
        // {
        //   label: 'Livestream',
        //   value: 'livestream'
        // },
        // {
        //   label: 'Form',
        //   value: 'form'
        // },
        {
          label: 'High Impact',
          value: 'highImpact'
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact'
        },
        {
          label: 'Low Impact',
          value: 'lowImpact'
        }
      ],
      required: true
    },
    {
      name: 'fullBackground',
      type: 'checkbox',
      admin: {
        condition: (_, { type } = {}) => type === 'gradient'
      }
    },
    // themeField(100),
    {
      type: 'collapsible',
      fields: [
        {
          name: 'enableBreadcrumbsBar',
          type: 'checkbox',
          label: 'Enable Breadcrumbs Bar'
        },
        linkGroup({
          appearances: false,
          overrides: {
            name: 'breadcrumbsBarLinks',
            admin: {
              condition: (_, { enableBreadcrumbsBar } = {}) => Boolean(enableBreadcrumbsBar)
            },
            labels: {
              plural: 'Links',
              singular: 'Link'
            }
          }
        })
      ],
      label: 'Breadcrumbs Bar'
    },
    {
      name: 'enableAnnouncement',
      type: 'checkbox',
      admin: {
        condition: (_, { type }) => ['homeOne', 'homeTwo'].includes(type)
      },
      label: 'Enable Announcement?'
    },
    link({
      appearances: false,
      overrides: {
        name: 'announcementLink',
        admin: {
          condition: (_, { enableAnnouncement }) => enableAnnouncement
        }
      }
    }),
    {
      name: 'richText',
      type: 'richText',
      admin: {
        condition: (_, { type } = {}) => type !== 'livestream'
      }
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        condition: (_, { type } = {}) =>
          // type !== 'livestream' &&
          type !== 'centeredContent' && type !== 'homeThree' && type !== 'homeTwo'
      }
    },
    linkGroup({
      appearances: false,
      overrides: {
        name: 'primaryButtons',
        admin: {
          condition: (_, { type }) => ['homeOne', 'homeTwo'].includes(type)
        },
        label: 'Primary Buttons'
      }
    }),
    {
      name: 'secondaryHeading',
      type: 'richText',
      admin: {
        condition: (_, { type }) => ['homeOne'].includes(type)
      }
    },
    {
      name: 'secondaryDescription',
      type: 'richText',
      admin: {
        condition: (_, { type }) => type === 'homeOne'
      }
    },
    linkGroup({
      overrides: {
        admin: {
          condition: (_, { type } = {}) =>
            ['centeredContent', 'contentMedia', 'default', 'gradient', 'livestream'].includes(type)
        }
      }
    }),
    {
      name: 'threeCTA',
      type: 'radio',
      admin: {
        condition: (_, { type }) => type === 'homeThree'
      },
      label: 'CTA?',
      options: [
        {
          label: 'Newsletter Sign Up',
          value: 'newsletter'
        },
        {
          label: 'Buttons',
          value: 'buttons'
        }
      ],
      required: true
    },
    {
      name: 'newsletter',
      type: 'group',
      admin: {
        condition: (_, { type, threeCTA }) => type === 'homeThree' && threeCTA === 'newsletter',
        hideGutter: true
      },
      fields: [
        {
          name: 'placeholder',
          type: 'text',
          admin: { placeholder: 'Enter your email' }
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            placeholder: 'Sign up to receive periodic updates and feature releases to your email.'
          }
        }
      ]
    },
    {
      name: 'buttons',
      type: 'blocks',
      admin: {
        condition: (_, { type, threeCTA }) => type === 'homeThree' && threeCTA === 'buttons'
      },
      blocks: [
        {
          slug: 'link',
          fields: [link()],
          labels: {
            plural: 'Links',
            singular: 'Link'
          }
        },
        {
          slug: 'command',
          fields: [
            {
              name: 'command',
              type: 'text',
              required: true
            }
          ],
          labels: {
            plural: 'Command Lines',
            singular: 'Command Line'
          }
        }
      ],
      labels: {
        plural: 'Buttons',
        singular: 'Button'
      }
    },
    linkGroup({
      appearances: false,
      overrides: {
        name: 'secondaryButtons',
        admin: {
          condition: (_, { type }) => ['homeOne'].includes(type)
        },
        label: 'Secondary Buttons'
      }
    }),
    {
      name: 'images',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => ['gradient', 'homeTwo', 'homeThree'].includes(type)
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true
        }
      ],
      minRows: 1
    },
    {
      name: 'enableMedia',
      type: 'checkbox',
      admin: {
        condition: (_, { type }) => type === 'centeredContent'
      },
      defaultValue: false
    },
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type, enableMedia } = {}) =>
          ['contentMedia', 'homeOne'].includes(type) || (enableMedia && type === 'centeredContent')
      },
      relationTo: 'media',
      required: true
    },
    {
      name: 'secondaryMedia',
      type: 'upload',
      admin: {
        condition: (_, { type }) => type === 'homeOne'
      },
      relationTo: 'media',
      required: true
    },
    {
      name: 'featureVideo',
      type: 'upload',
      admin: {
        condition: (_, { type }) => ['homeOne'].includes(type)
      },
      relationTo: 'media',
      required: true
    },
    {
      name: 'form',
      type: 'relationship',
      admin: {
        condition: (_, { type }) => type === 'form'
      },
      relationTo: 'forms'
    },
    {
      name: 'logos',
      type: 'array',
      admin: {
        condition: (_, { type }) => type === 'homeOne'
      },
      fields: [
        {
          name: 'logoMedia',
          type: 'upload',
          label: 'Media',
          relationTo: 'media',
          required: true
        }
      ]
    },
    {
      name: 'logoShowcaseLabel',
      type: 'richText',
      admin: {
        condition: (_, { type }) => type === 'homeTwo'
      }
    },
    {
      name: 'logoShowcase',
      type: 'upload',
      admin: {
        condition: (_, { type }) => type === 'homeTwo'
      },
      hasMany: true,
      minRows: 7,
      relationTo: 'media'
    }
  ],
  label: false
}
