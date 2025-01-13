import { basicLexical } from '@services/editor/basicLexical'
import { getLivePreviewUrl } from '@services/preview/getLivePreviewUrl'
import { getPreviewUrl } from '@services/preview/getPreviewUrl'
import { relatedDocsField } from '@fields/shared/relatedDocsField'
import { seoTab } from '@fields/shared/seoTab'
import { slugField } from '@fields/shared/slug/config'
import { tagsField } from '@fields/shared/tagsField'
import { anyone } from '@access/anyone'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'

import type { CollectionConfig } from 'payload'

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
    defaultColumns: ['images', 'title', 'area', 'style', 'artist', 'createdAt', 'updatedAt'],
    livePreview: getLivePreviewUrl('tattoo'),
    preview: getPreviewUrl('tattoo')
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
              name: 'images',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              minRows: 1,
              maxRows: 12,
              label: 'Images',
              admin: {
                description: 'Up to 12 images.'
              }
            },
            {
              name: 'video',
              type: 'upload',
              relationTo: 'media',
              hasMany: false,
              label: 'Video'
            },
            {
              type: 'row',
              required: true,
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
                }
              ]
            },
            {
              name: 'artist',
              type: 'relationship',
              relationTo: 'artist',
              hasMany: true,
              label: {
                singular: 'Artist',
                plural: 'Artists'
              },
              admin: {
                position: 'sidebar'
              }
            },
            {
              name: 'description',
              type: 'richText',
              editor: basicLexical,
              admin: {
                position: 'sidebar'
              }
            },
            relatedDocsField,
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
