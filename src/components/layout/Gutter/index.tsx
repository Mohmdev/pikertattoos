import React from 'react'

import classes from './index.module.scss'

type Props = {
  children: React.ReactNode
  className?: string
  dataTheme?: string
  disableMobile?: boolean
  leftGutter?: boolean
  rightGutter?: boolean
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ref?: React.RefObject<any>
}
export const Gutter: React.FC<Props> = ({
  children,
  className,
  dataTheme,
  disableMobile,
  leftGutter = true,
  rightGutter = true,
  ref: refFromProps,
}) => {
  return (
    <div
      className={[
        className,
        leftGutter && classes.leftGutter,
        rightGutter && classes.rightGutter,
        disableMobile && classes.disableMobile,
      ]
        .filter(Boolean)
        .join(' ')}
      data-theme={dataTheme}
      ref={refFromProps || null}
    >
      {children}
    </div>
  )
}
