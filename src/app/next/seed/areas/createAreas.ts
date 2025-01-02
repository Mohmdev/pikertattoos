import { Payload } from 'payload'

import areasJson from './areas.json'

type Breadcrumb = {
  id: string
  doc: number
  url: string
  label: string
}

type ParentArea = {
  id: number
  title: string
  parent: null
  breadcrumbs: Breadcrumb[]
}

type Area = {
  id: number
  title: string
  slug: string
  parent: ParentArea | null
  breadcrumbs: Breadcrumb[]
}

export const areasData: Area[] = areasJson.docs

export const createAreas = async (payload: Payload): Promise<void> => {
  for (const area of areasData) {
    try {
      // Check if area already exists
      const existingArea = await payload.find({
        collection: 'area',
        where: {
          title: {
            equals: area.title
          }
        }
      })

      if (existingArea.docs.length === 0) {
        await payload.create({
          collection: 'area',
          data: {
            _status: 'published',
            id: area.id,
            title: area.title,
            slug: area.slug,
            parent: area.parent?.id || null, // Only store the parent ID reference
            breadcrumbs: area.breadcrumbs
          }
        })
        payload.logger.info(`Created area "${area.title}"`)
      } else {
        payload.logger.info(`Area "${area.title}" already exists, skipping...`)
      }
    } catch (error) {
      payload.logger.error(`Error seeding area "${area.title}":`, error)
    }
  }
}
