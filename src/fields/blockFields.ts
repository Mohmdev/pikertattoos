import deepMerge from '@utils/deepMerge'

import type { Field, GroupField } from 'payload'

interface Args {
  fields: Field[]
  name: string
  overrides?: Partial<GroupField>
}

// export const themeFields: (width?: number) => Field = (width) => ({
//   name: 'theme',
//   type: 'select',
//   admin: {
//     description: 'Leave blank for system default',
//     width: width ? `${width}%` : '50%'
//   },
//   options: [
//     {
//       label: 'Light',
//       value: 'light'
//     },
//     {
//       label: 'Dark',
//       value: 'dark'
//     }
//   ]
// })

export const backgroundFields: Field = {
  name: 'bg',
  type: 'select',
  admin: {
    width: '50%'
  },
  options: [
    {
      label: 'Solid',
      value: 'solid'
    },
    {
      label: 'Transparent',
      value: 'trnsprnt'
    },
    {
      label: 'Gradient Up',
      value: 'grdntup'
    },
    {
      label: 'Gradient Down',
      value: 'gtdntdwn'
    }
  ]
}

export const blockFields = ({ name, fields, overrides }: Args): Field =>
  deepMerge(
    {
      name,
      type: 'group',
      admin: {
        hideGutter: true,
        style: {
          margin: 0,
          padding: 0
        }
      },
      fields: [
        {
          type: 'collapsible',
          fields: [
            {
              name: 'settings',
              type: 'group',
              admin: {
                hideGutter: true,
                initCollapsed: true
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    // themeFields(),
                    backgroundFields
                  ]
                }
              ],
              label: false
            }
          ],
          label: 'Settings'
        },
        ...fields
      ],
      label: false
    },
    overrides
  )
