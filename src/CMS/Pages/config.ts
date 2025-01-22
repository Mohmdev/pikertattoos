import { getLivePreviewUrl } from '@services/preview/getLivePreviewUrl'
import { getPreviewUrl } from '@services/preview/getPreviewUrl'
import { heroFields } from '@heros/config'
import { ArchiveBlock } from '@blocks/ArchiveBlock/config'
import { CallToActionBlock } from '@blocks/CallToActionBlock/config'
import { ContentBlock } from '@blocks/ContentBlock/config'
import { FormBlock } from '@blocks/FormBlock/config'
import { MediaBlock } from '@blocks/MediaBlock/config'
import { fullTitle } from '@fields/fullTitle/config'
import { authorsField } from '@fields/shared/authorsField'
import { noindexField } from '@fields/shared/noindexField'
import { populateAuthorsField } from '@fields/shared/populatedAuthorsField'
import { publishedAtField } from '@fields/shared/publishedAtField'
import { seoTab } from '@fields/shared/seoTab'
import { slugField } from '@fields/shared/slug/config'
import { tagsField } from '@fields/shared/tagsField'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'
import { publishedOnly } from '@access/publishedOnly'

import { populateAuthors } from '@hooks/populateAuthors'
import { populatePublishedAt } from '@hooks/populatePublishedAt'

import type { CollectionConfig } from 'payload'

import { revalidateDelete, revalidatePage } from './revalidatePage'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    read: publishedOnly,
    create: isAdminOrEditor,
    delete: isAdminOrSelf,
    update: isAdminOrSelf,
    readVersions: isAdminOrEditor
  },
  admin: {
    useAsTitle: 'fullTitle',
    defaultColumns: ['fullTitle', 'populatedAuthors', 'slug', 'createdAt', 'updatedAt'],
    livePreview: getLivePreviewUrl('pages'),
    preview: getPreviewUrl('pages')
  },
  defaultPopulate: {
    slug: true,
    breadcrumbs: true,
    title: true
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
          fields: [
            heroFields,
            {
              name: 'blocks',
              type: 'blocks',
              blocks: [CallToActionBlock, ContentBlock, MediaBlock, ArchiveBlock, FormBlock],
              label: 'Blocks',
              admin: {
                initCollapsed: true
              }
            }
          ],
          label: 'layout'
        },
        {
          label: 'Options',
          fields: [fullTitle, tagsField]
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
    afterChange: [revalidatePage],
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
