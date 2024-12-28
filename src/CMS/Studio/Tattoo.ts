import { slugField } from '@fields/slug/config'

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
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tag',
      hasMany: true,
      label: {
        singular: 'Tag',
        plural: 'Tags'
      }
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
