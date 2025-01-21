import { basicLexical } from '@services/editor/basicLexical'
import { getLivePreviewUrl } from '@services/preview/getLivePreviewUrl'
import { getPreviewUrl } from '@services/preview/getPreviewUrl'
import { authorsField } from '@fields/shared/authorsField'
import { noindexField } from '@fields/shared/noindexField'
import { populateAuthorsField } from '@fields/shared/populatedAuthorsField'
import { publishedAtField } from '@fields/shared/publishedAtField'
import { relatedDocsField } from '@fields/shared/relatedDocsField'
import { seoTab } from '@fields/shared/seoTab'
import { slugField } from '@fields/shared/slug/config'
import { tagsField } from '@fields/shared/tagsField'
import { anyone } from '@access/anyone'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'

import { populateAuthors } from '@hooks/populateAuthors'
import { populatePublishedAt } from '@hooks/populatePublishedAt'

import type { CollectionConfig } from 'payload'

import { revalidateDelete, revalidateTattoo } from './hooks/revalidateTattoo'

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
  defaultPopulate: {
    title: true,
    slug: true,
    area: true,
    style: true,
    images: true
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tattoo Title',
      required: true,
      unique: true,
      index: true
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
              },
              index: true
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
                  },
                  index: true
                },
                {
                  name: 'style',
                  type: 'relationship',
                  relationTo: 'style',
                  hasMany: true,
                  label: {
                    singular: 'Style',
                    plural: 'Styles'
                  },
                  index: true
                }
              ]
            },

            {
              name: 'description',
              type: 'richText',
              editor: basicLexical,
              admin: {
                position: 'sidebar'
              }
            }
          ]
        },
        {
          label: 'Options',
          fields: [
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
            relatedDocsField,
            tagsField
          ]
        },
        seoTab
      ]
    },
    noindexField,
    authorsField,
    populateAuthorsField,
    publishedAtField,
    ...slugField()
  ],
  hooks: {
    afterChange: [revalidateTattoo],
    beforeChange: [populatePublishedAt],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete]
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100
      },
      schedulePublish: true
    },
    maxPerDoc: 50
  }
}
