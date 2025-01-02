'use client'

import { useRowLabel } from '@payloadcms/ui'

import { PayloadClientReactComponent, RowLabelComponent } from 'payload'

const CustomRowLabelTabs: PayloadClientReactComponent<RowLabelComponent> = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = useRowLabel<any>()

  return data.label || '...'
}

export default CustomRowLabelTabs
