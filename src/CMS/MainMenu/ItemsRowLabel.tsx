'use client'

import { useRowLabel } from '@payloadcms/ui'

import type { PayloadClientReactComponent, RowLabelComponent } from 'payload'

export const ItemsRowLabel: PayloadClientReactComponent<
  RowLabelComponent
> = () => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const { data } = useRowLabel<any>()

  if (data.style === 'default') {
    return data.defaultLink?.link.label
  }
  if (data.style === 'featured') {
    return data.featuredLink?.tag
  }
  if (data.style === 'list') {
    return data.listLinks?.tag
  }
}
