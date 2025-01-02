import * as React from 'react'

import { CheckIcon } from 'lucide-react'

import type { BannerBlockProps } from '..'

import RichText from '@components/RichText'

import classes from './index.module.scss'

const Icons = {
  checkmark: CheckIcon
}

export const BannerBlockContent: React.FC<BannerBlockProps> = ({
  bannerType = 'default',
  checkmark,
  children,
  richTextContent,
  icon,
  margin = true,
  marginAdjustment = {}
}) => {
  let Icon = icon && Icons[icon]
  if (!Icon && checkmark) {
    Icon = Icons.checkmark
  }

  return (
    <div
      className={[
        classes.banner,
        'banner',
        bannerType && classes[bannerType],
        !margin && classes.noMargin
      ]
        .filter(Boolean)
        .join(' ')}
      style={marginAdjustment}
    >
      {Icon && <Icon className={classes.icon} />}

      {richTextContent && <RichText data={richTextContent} />}
      {children && <div className={classes.children}>{children}</div>}
    </div>
  )
}
