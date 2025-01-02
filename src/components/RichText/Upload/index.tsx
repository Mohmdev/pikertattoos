import React from 'react'

import type { CMSLinkProps } from '@components/dynamic/CMSLink/advanced'
import type { Media as MediaType } from '@payload-types'
import type { SerializedUploadNode } from '@payloadcms/richtext-lexical'

import { CMSLink } from '@components/dynamic/CMSLink/advanced'
import { Media } from '@components/dynamic/Media'

export type RichTextUploadNodeType = {
  fields: {
    enableLink?: boolean
    link?: CMSLinkProps
  }
  relationTo: string
  value?: MediaType
}

export type Props = {
  className?: string
  node: SerializedUploadNode
}

export const RichTextUpload: React.FC<Props> = (props) => {
  const {
    className,
    node: { fields, value }
  } = props

  let Wrap: React.ComponentType<CMSLinkProps> | string = 'div'

  const styles: React.CSSProperties = {}

  let wrapProps: CMSLinkProps = {}

  if (fields?.enableLink) {
    Wrap = CMSLink
    wrapProps = {
      ...fields?.link
    }
  }

  return (
    <div className={className} style={styles}>
      <Wrap {...wrapProps}>
        <Media resource={value as MediaType} />
      </Wrap>
    </div>
  )
}

export default RichTextUpload
