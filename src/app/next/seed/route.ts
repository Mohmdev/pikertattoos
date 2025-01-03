import { headers } from 'next/headers'

import config from '@payload-config'

import { createLocalReq, getPayload } from 'payload'

import { seedScript } from './seedScript'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

export async function POST(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req: Request & {
    cookies: {
      get: (name: string) => {
        value: string
      }
    }
  }
): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user || user.role !== 'admin') {
    return new Response('Action forbidden. Admin access required.', { status: 403 })
  }

  try {
    // Create a Payload request object to pass to the Local API for transactions
    // At this point you should pass in a user, locale, and any other context you need for the Local API
    const payloadReq = await createLocalReq({ user }, payload)

    await seedScript({ payload, req: payloadReq })

    return Response.json({ success: true })
  } catch (error) {
    return new Response(`${error.message}`, { status: 500 })
  }
}
