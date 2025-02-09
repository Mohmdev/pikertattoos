'use client'

import { useRowLabel } from '@payloadcms/ui'

import { PayloadClientReactComponent, RowLabelComponent } from 'payload'

export const TabsRowLabel: PayloadClientReactComponent<
  RowLabelComponent
> = () => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const { data } = useRowLabel<any>()

  return data.label || '...'
}
