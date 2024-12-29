import { seoTab } from '@fields/shared/seoTab'
import { slugField } from '@fields/shared/slug/config'
import { tagsField } from '@fields/shared/tagsField'

import { getLivePreviewUrl } from '@utils/getLivePreviewUrl'
import { getPreviewUrl } from '@utils/getPreviewUrl'

import type { CollectionConfig } from 'payload'

import { anyone } from '@access/anyone'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'

export const Tattoo: CollectionConfig<'tattoo'> = {
  slug: 'tattoo',
  labels: {
    singular: 'Tattoo',
    plural: 'Tattoos'
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    delete: isAdminOrSelf,
    update: isAdminOrSelf
  },
  admin: {
    useAsTitle: 'title',
    livePreview: getLivePreviewUrl('pages'),
    preview: getPreviewUrl('pages')
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tattoo Title'
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            {
              name: 'area',
              type: 'relationship',
              relationTo: 'area',
              hasMany: true,
              label: {
                singular: 'Area',
                plural: 'Areas'
              }
            },
            {
              name: 'style',
              type: 'relationship',
              relationTo: 'style',
              hasMany: true,
              label: {
                singular: 'Style',
                plural: 'Styles'
              }
            },
            {
              name: 'artist',
              type: 'relationship',
              relationTo: 'artist',
              hasMany: true,
              label: {
                singular: 'Artist',
                plural: 'Artists'
              }
            },
            tagsField
          ]
        },
        seoTab
      ]
    },
    ...slugField()
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100
      }
    },
    maxPerDoc: 50
  }
}
