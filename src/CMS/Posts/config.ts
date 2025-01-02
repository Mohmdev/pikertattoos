import { blogEditor } from '@services/editor/blogEditor'
import { authorsField } from '@fields/shared/authorsField'
import { categoriesField } from '@fields/shared/categoriesField'
import { noindexField } from '@fields/shared/noindexField'
import { publishedAtField } from '@fields/shared/publishedAtField'
import { relatedPostsField } from '@fields/shared/relatedPostsField'
import { seoTab } from '@fields/shared/seoTab'
import { slugField } from '@fields/shared/slug/config'
import { tagsField } from '@fields/shared/tagsField'

import { getLivePreviewUrl } from '@utils/getLivePreviewUrl'
import { getPreviewUrl } from '@utils/getPreviewUrl'
import { populateAuthors } from '@hooks/populateAuthors'
import { populatePublishedAt } from '@hooks/populatePublishedAt'

import type { CollectionConfig } from 'payload'

import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'
import { publishedOnly } from '@access/publishedOnly'

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
    defaultColumns: ['title', 'authors', 'slug', 'createdAt', 'updatedAt'],
    livePreview: getLivePreviewUrl('posts'),
    preview: getPreviewUrl('posts')
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media'
            },
            {
              name: 'editor',
              label: 'Editor',
              type: 'richText',
              editor: blogEditor,
              required: true
            }
          ]
        },
        {
          label: 'Options',
          fields: [categoriesField, tagsField, relatedPostsField]
        },
        seoTab
      ]
    },
    noindexField,
    publishedAtField,
    authorsField,
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
      }
    },
    maxPerDoc: 50
  }
}
