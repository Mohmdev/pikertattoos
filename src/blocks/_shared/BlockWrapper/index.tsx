import type { PaddingOptions, Settings } from '@components/types'

import classes from './index.module.scss'

type BlockWrapperProps = {
  children: React.ReactNode
  className?: string
  hideBackground?: boolean
  padding?: PaddingOptions
  /**
   * Controls whether or not to set the padding or just provide the css variables
   *
   * Useful for complex components that need to set padding on a child element
   */
  setPadding?: boolean
  settings: Settings
} & React.HTMLAttributes<HTMLDivElement>

export const BlockWrapper: React.FC<BlockWrapperProps> = ({
  children,
  className,
  hideBackground,
  padding,
  setPadding = true,
  settings,
  ...rest
}) => {
  return (
    <div
      className={[
        classes.blockWrapper,
        padding?.top && classes[`padding-top-${padding?.top}`],
        padding?.bottom && classes[`padding-bottom-${padding?.bottom}`],
        setPadding && classes.setPadding,
        settings?.bg && classes[`background-${settings.bg}`],
        hideBackground && classes.hideBackground,
        className
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}
