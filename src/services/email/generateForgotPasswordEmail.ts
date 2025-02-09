import { getServerSideURL } from '@utils/getURL'

import type { PayloadRequest } from 'payload'

import { generateEmailHTML } from './generateEmailHTML'

type ForgotPasswordEmailArgs =
  | {
      req?: PayloadRequest
      token?: string
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      user?: any
    }
  | undefined

export const generateForgotPasswordEmail = async (
  args: ForgotPasswordEmailArgs,
): Promise<string> => {
  return generateEmailHTML({
    content: '<p>Let&apos;s get you back in.</p>',
    cta: {
      buttonLabel: 'Reset your password',
      url: `${getServerSideURL()}/reset-password?token=${args?.token}`,
    },
    headline: 'Locked out? | Nexweb',
  })
}
