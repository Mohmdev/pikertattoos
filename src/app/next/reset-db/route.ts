import { headers } from 'next/headers'

import config from '@payload-config'

import { createLocalReq, getPayload } from 'payload'

import { clearDBScript } from './clearDBScript'

export const maxDuration = 60

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

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    const payloadReq = await createLocalReq({ user }, payload)

    await clearDBScript({ payload, req: payloadReq })

    return Response.json({ success: true })
  } catch (error) {
    return new Response(`Script failed to finish; ${error.message}`, { status: 500 })
  }
}
