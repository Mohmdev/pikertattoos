import { headers } from 'next/headers'

import config from '@payload-config'

import { createLocalReq, getPayload } from 'payload'

import { areasData } from './areasData'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()
  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders })
  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    // Create a Payload request object to pass to the Local API for transactions
    // At this point you should pass in a user, locale, and any other context you need for the Local API
    const payloadReq = await createLocalReq({ user }, payload)

    await createAreas({ payload, req: payloadReq })

    return Response.json({ success: true })
  } catch {
    return new Response('Error seeding data.', { status: 500 })
  }
}

const createAreas = async ({ payload, req }): Promise<void> => {
  for (const area of areasData) {
    try {
      await payload.create({
        req,
        collection: 'area',
        data: {
          _status: 'published',
          // id: area.id,
          title: area.title,
          slug: area.slug
        },
        overrideLock: true
      })
      payload.logger.info(`✓ ${area.title}`)
    } catch (error) {
      payload.logger.info(`✕ ${area.title}`)
      throw new Error(`${area.title} - ${error}`)
    }
  }
}

// export const updateAreas = async (payload: Payload): Promise<void> => {
//   for (const area of areasWithParentsData) {
//     try {
//       await payload.update({
//         collection: 'area',
//         where: {
//           // id: { equals: area.id },
//           slug: {
//             equals: area.slug
//           },
//           parent: {
//             equals: null
//           }
//         },
//         data: {
//           _status: 'published',
//           // id: area.id,
//           title: area.title,
//           slug: area.slug,

//           parent: {
//             // id: area.parent?.id,
//             title: area.parent?.title,
//             slug: area.parent?.slug
//           } as Area['parent']
//         }
//       })
//       payload.logger.info('✓ ${area.title}')
//     } catch (error) {
//       payload.logger.info(`✕ ${area.title}`)
//       throw new Error(`${area.title} - ${error}`)
//     }
//   }
//   // for (const area of areasWithParentsData) {
//   //   try {
//   //     if (!area.title) {
//   //       throw new Error(`Area title is required but was not provided`)
//   //     }
//   //     const existingArea = await payload.find({
//   //       collection: 'area',
//   //       where: {
//   //         title: {
//   //           equals: area.title
//   //         }
//   //       }
//   //     })

//   //     if (existingArea.docs) {
//   //       await payload.update({
//   //         collection: 'area',
//   //         where: {
//   //           id: { equals: area.id },
//   //           title: {
//   //             equals: area.title
//   //           },
//   //           slug: {
//   //             equals: area.slug
//   //           },
//   //           parent: {
//   //             equals: null
//   //           }
//   //         },
//   //         data: {
//   //           _status: 'published',
//   //           id: area.id,
//   //           title: area.title,
//   //           slug: area.slug,
//   //           parent: {
//   //             id: area.parent.id,
//   //             title: area.parent.title,
//   //             slug: area.parent.slug
//   //           }
//   //         }
//   //       })
//   //       payload.logger.info(`Updated area "${area.title} with parent ${area.parent.title}"`)
//   //     } else {
//   //       payload.logger.info(`Area "${area.title}" already has parent, skipping...`)
//   //     }
//   //   } catch (error) {
//   //     throw new Error(
//   //       `Failed to add parent "${area.parent.title}" to area "${area.title}": ${error}`
//   //     )
//   //   }
//   // }
// }
