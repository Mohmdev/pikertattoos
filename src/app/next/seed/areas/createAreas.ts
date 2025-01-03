import { Payload } from 'payload'

import type { Area } from '@payload-types'

import { areasData, areasWithParentsData } from './areasData'

export const createAreas = async (payload: Payload): Promise<void> => {
  for (const area of areasData) {
    try {
      await payload.create({
        collection: 'area',
        data: {
          _status: 'published',
          // id: area.id,
          title: area.title,
          slug: area.slug
        }
      })
      payload.logger.info('✓ ${area.title}')
    } catch (error) {
      payload.logger.info(`✕ ${area.title}`)
      throw new Error(`${area.title} - ${error}`)
    }
  }
}

export const updateAreas = async (payload: Payload): Promise<void> => {
  for (const area of areasWithParentsData) {
    try {
      await payload.update({
        collection: 'area',
        where: {
          // id: { equals: area.id },
          slug: {
            equals: area.slug
          },
          parent: {
            equals: null
          }
        },
        data: {
          _status: 'published',
          // id: area.id,
          title: area.title,
          slug: area.slug,

          parent: {
            // id: area.parent?.id,
            title: area.parent?.title,
            slug: area.parent?.slug
          } as Area['parent']
        }
      })
      payload.logger.info('✓ ${area.title}')
    } catch (error) {
      payload.logger.info(`✕ ${area.title}`)
      throw new Error(`${area.title} - ${error}`)
    }
  }
  // for (const area of areasWithParentsData) {
  //   try {
  //     if (!area.title) {
  //       throw new Error(`Area title is required but was not provided`)
  //     }
  //     const existingArea = await payload.find({
  //       collection: 'area',
  //       where: {
  //         title: {
  //           equals: area.title
  //         }
  //       }
  //     })

  //     if (existingArea.docs) {
  //       await payload.update({
  //         collection: 'area',
  //         where: {
  //           id: { equals: area.id },
  //           title: {
  //             equals: area.title
  //           },
  //           slug: {
  //             equals: area.slug
  //           },
  //           parent: {
  //             equals: null
  //           }
  //         },
  //         data: {
  //           _status: 'published',
  //           id: area.id,
  //           title: area.title,
  //           slug: area.slug,
  //           parent: {
  //             id: area.parent.id,
  //             title: area.parent.title,
  //             slug: area.parent.slug
  //           }
  //         }
  //       })
  //       payload.logger.info(`Updated area "${area.title} with parent ${area.parent.title}"`)
  //     } else {
  //       payload.logger.info(`Area "${area.title}" already has parent, skipping...`)
  //     }
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to add parent "${area.parent.title}" to area "${area.title}": ${error}`
  //     )
  //   }
  // }
}
