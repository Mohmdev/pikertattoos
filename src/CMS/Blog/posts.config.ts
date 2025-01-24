import { blogEditor } from '@services/editor/blogEditor'
import { getLivePreviewUrl } from '@services/preview/getLivePreviewUrl'
import { getPreviewUrl } from '@services/preview/getPreviewUrl'
import { authorsField } from '@fields/shared/authorsField'
import { categoriesField } from '@fields/shared/categoriesField'
import { noindexField } from '@fields/shared/noindexField'
import { populateAuthorsField } from '@fields/shared/populatedAuthorsField'
import { publishedAtField } from '@fields/shared/publishedAtField'
import { relatedDocsField } from '@fields/shared/relatedDocsField'
import { seoTab } from '@fields/shared/seoTab'
import { slugField } from '@fields/shared/slug/config'
import { tagsField } from '@fields/shared/tagsField'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'
import { publishedOnly } from '@access/publishedOnly'

import { populateAuthors } from '@hooks/populateAuthors'
import { populatePublishedAt } from '@hooks/populatePublishedAt'

import type { CollectionConfig } from 'payload'

import { revalidateDelete, revalidatePost } from './revalidatePost'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts'
  },
  access: {
    read: publishedOnly,
    create: isAdminOrEditor,
    delete: isAdminOrSelf,
    update: isAdminOrSelf,
    readVersions: isAdminOrEditor
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true
    }
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'populatedAuthors', 'slug', 'createdAt', 'updatedAt'],
    livePreview: getLivePreviewUrl('posts'),
    preview: getPreviewUrl('posts')
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
      index: true
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              label: 'Hero Image',
              name: 'images',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              minRows: 1,
              maxRows: 12,
              admin: {
                description: 'Up to 12 images.'
              },
              index: true
            },
            {
              name: 'richTextContent',
              label: 'Editor',
              type: 'richText',
              editor: blogEditor
            }
          ]
        },
        {
          label: 'Options',
          fields: [categoriesField, relatedDocsField, tagsField]
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
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
    beforeChange: [populatePublishedAt]
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
