import { headers } from 'next/headers'

import config from '@payload-config'

import {
  // createLocalReq,
  getPayload
} from 'payload'

import { seedScript } from './seedScript'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

export async function POST(): Promise<Response> {
  // req: Request & {
  //   cookies: {
  //     get: (name: string) => {
  //       value: string
  //     }
  //   }
  // },
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    // Create a Payload request object to pass to the Local API for transactions
    // const payloadReq = await createLocalReq({ user }, payload)
    await seedScript(payload)

    return Response.json({ success: true })
  } catch (error) {
    console.error('Error seeding radio data:', error)
    return new Response('Error seeding radio data.', { status: 500 })
  }
}
