import React from 'react'
import Link from 'next/link'

import { generateReferenceURL } from '@utils/generateReferenceURL'

import type { CMSLinkOptions, LinkAppearanceOptions, Reference } from '@components/types'

import { Button, ButtonProps } from '@components/dynamic/Button'

export type CMSLinkProps = {
  appearance?: LinkAppearanceOptions
  buttonProps?: ButtonProps
  children?: React.ReactNode
  className?: string
  customId?: null | string
  fullWidth?: boolean
  label?: null | string
  mobileFullWidth?: boolean
  newTab?: boolean | null
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  reference?: null | Reference
  type?: CMSLinkOptions
  url?: null | string
}

export const CMSLink: React.FC<CMSLinkProps> = ({
  type,
  url,
  newTab,
  reference,
  customId,
  label,
  appearance,
  children,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  fullWidth = false,
  mobileFullWidth = false,
  buttonProps: buttonPropsFromProps
}) => {
  let href = generateReferenceURL({ type, url, reference })

  if (!href) {
    return (
      <span
        className={className}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        id={customId ?? ''}
      >
        {label}
        {children}
      </span>
    )
  }

  if (!appearance) {
    const hrefIsLocal = ['tel:', 'mailto:', '/'].some((prefix) => href.startsWith(prefix))

    if (!hrefIsLocal && href !== '#') {
      try {
        const objectURL = new URL(href)
        if (objectURL.origin === process.env.NEXT_PUBLIC_SITE_URL) {
          href = objectURL.href.replace(process.env.NEXT_PUBLIC_SITE_URL, '')
        }
      } catch (e) {
        // Do not throw error if URL is invalid
        // This will prevent the page from building
        console.log(`Failed to format url: ${href}`, e)
      }
    }

    const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

    if (href.indexOf('/') === 0) {
      return (
        <Link
          href={href}
          {...newTabProps}
          className={className}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          prefetch={false}
          id={customId ?? ''}
        >
          {label && label}
          {children && children}
        </Link>
      )
    }

    return (
      <a
        href={href}
        {...newTabProps}
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        id={customId ?? ''}
      >
        {label && label}
        {children && children}
      </a>
    )
  }

  const buttonProps: ButtonProps = {
    ...buttonPropsFromProps,
    newTab,
    href,
    appearance,
    label,
    onClick,
    onMouseEnter,
    onMouseLeave,
    fullWidth,
    mobileFullWidth
  }

  if (appearance === 'default') {
    buttonProps.icon = 'arrow'
  }

  return <Button {...buttonProps} className={className} el="link" id={customId ?? ''} />
}
