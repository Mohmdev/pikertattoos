import { Payload } from 'payload'

import areasJson from './areas.json'
import areasWithParentsJson from './areasWithParents.json'

// type ParentArea = {
//   title?: string
//   slug: string
//   // parent?: null
//   // breadcrumbs: Breadcrumb[]
// }
type Area = {
  title?: string
  slug: string
  // breadcrumbs?: Breadcrumb[]
  // parent?: {
  //   title: string
  //   slug: string
  // } | null
}

const areasData: Area[] = areasJson.docs

export const createAreas = async (payload: Payload): Promise<void> => {
  for (const area of areasData) {
    try {
      if (!area.title) {
        throw new Error(`Area title is required but was not provided`)
      }

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
          overrideAccess: true,
          data: {
            _status: 'published',
            title: area.title,
            slug: area.slug
          }
        })
        payload.logger.info(`Created area "${area.title}"`)
      } else {
        payload.logger.info(`Area "${area.title}" already exists, skipping...`)
      }
    } catch (error) {
      throw new Error(`Failed to create area "${area.title}": ${error}`)
    }
  }
}

type AreaWithParent = {
  title?: string
  slug: string
  parent?: {
    title: string
    slug: string
  } | null
}

const areasWithParentsData: AreaWithParent[] = areasWithParentsJson.docs

export const updateAreas = async (payload: Payload): Promise<void> => {
  for (const area of areasWithParentsData) {
    try {
      if (!area.title) {
        throw new Error(`Area title is required but was not provided`)
      }
      const existingArea = await payload.find({
        collection: 'area',
        where: {
          title: {
            equals: area.title
          }
        }
      })

      if (existingArea.docs) {
        await payload.update({
          collection: 'area',
          where: {
            title: {
              equals: area.title
            }
          },
          data: {
            _status: 'published',
            parent: {
              title: area.parent?.title,
              slug: area.parent?.slug
            }
            // title: area.title,
            // slug: area.slug
          }
        })
        payload.logger.info(`Updated area "${area.title} with parent ${area.parent?.title}"`)
      } else {
        payload.logger.info(`Area "${area.title}" already has parent, skipping...`)
      }
    } catch (error) {
      throw new Error(
        `Failed to add parent "${area.parent?.title}" to area "${area.title}": ${error}`
      )
    }
  }
}
