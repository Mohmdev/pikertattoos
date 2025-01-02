'use client'

import { useRowLabel } from '@payloadcms/ui'

import { PayloadClientReactComponent, RowLabelComponent } from 'payload'

const CustomRowLabelNavItems: PayloadClientReactComponent<RowLabelComponent> = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export default CustomRowLabelNavItems
