/* eslint-disable */

'use client'

import React from 'react'

import { hasText } from '@payloadcms/richtext-lexical/shared'

import RichText from '../../components/RichText'
import classes from './index.module.scss'

export const UploadBlockImage: (props: {
  alt?: string
  caption?: any
  src: string
}) => React.JSX.Element = ({ alt, caption, src }) => {
  return (
    <div className={classes.imageWrap}>
      <img alt={alt} src={src} />
      {caption && hasText(caption) ? (
        <div className={classes.caption}>
          <RichText data={caption} />
        </div>
      ) : null}
    </div>
  )
}
