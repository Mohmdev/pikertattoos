'use client'

import React, { forwardRef, HTMLAttributes, useEffect, useState } from 'react'
import Link from 'next/link'

import { ArrowUpIcon, CopyIcon, GithubIcon, LoaderIcon, PlusIcon, SearchIcon } from 'lucide-react'
import { generateReferenceURL } from '@utils/generateReferenceURL'

import type { CMSLinkOptions, LinkAppearanceOptions, Reference } from '@components/types'

import classes from './index.module.scss'

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  appearance?: LinkAppearanceOptions
  customId?: string | null
  el?: 'button' | 'link' | 'a' | 'div'
  href?: string | null
  newTab?: boolean | null
  label?: string | null
  labelStyle?: 'mono' | 'regular'
  labelClassName?: string
  icon?: false | 'arrow' | 'search' | 'github' | 'plus' | 'loading' | 'copy'
  iconSize?: 'large' | 'medium' | 'small' | undefined
  fullWidth?: boolean
  mobileFullWidth?: boolean
  type?: CMSLinkOptions
  reference?: Reference
  htmlButtonType?: 'button' | 'submit'
  size?: 'pill' | 'default' | 'large'
  disabled?: boolean
  url?: string | null
  /**
   * Hides all borders
   */
  hideBorders?: boolean
  /**
   * Hides the horizontal borders of the button, useful for buttons in grids
   */
  hideHorizontalBorders?: boolean
  /**
   * Hides the horizontal borders of the button
   */
  hideVerticalBorders?: boolean
  /**
   * Hides the bottom border except for the last of type
   */
  hideBottomBorderExceptLast?: boolean
  /**
   * Forces a background on the default button appearance
   */
  forceBackground?: boolean
  arrowClassName?: string
  iconRotation?: number
  isCMSFormSubmitButton?: boolean
}

const icons = {
  arrow: ArrowUpIcon,
  search: SearchIcon,
  github: GithubIcon,
  plus: PlusIcon,
  loading: LoaderIcon,
  copy: CopyIcon
}

const ButtonContent: React.FC<ButtonProps> = (props) => {
  const {
    icon,
    label,
    labelStyle = 'mono',
    labelClassName,
    appearance,
    iconRotation,
    iconSize,
    isCMSFormSubmitButton,
    // size,
    arrowClassName
  } = props

  const Icon = icon ? icons[icon] : null

  const iconProps = {
    size: iconSize,
    rotation: icon === 'arrow' ? iconRotation : undefined
  }

  if (appearance === 'default') {
    return (
      <div className={[classes.contentWrapper].filter(Boolean).join(' ')}>
        <div
          className={[
            classes.content,
            classes.defaultLabel,
            isCMSFormSubmitButton && classes.cmsFormSubmitButtonContent
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {label && (
            <div
              className={[
                classes.label,
                !icon && classes['label-centered'],
                classes[`label-${labelStyle}`],
                labelClassName
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {label}
            </div>
          )}
          {Icon && label && <div className={classes.spacer} />}
          {Icon && (
            <Icon
              className={[classes.icon, arrowClassName, classes[`icon--${icon}`]]
                .filter(Boolean)
                .join(' ')}
              {...iconProps}
            />
          )}
        </div>
        <div
          aria-hidden={true}
          className={[
            classes.content,
            classes.hoverLabel,
            isCMSFormSubmitButton && classes.cmsFormSubmitButtonContent
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {label && (
            <div
              className={[
                classes.label,
                !icon && classes['label-centered'],
                classes[`label-${labelStyle}`],
                labelClassName
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {label}
            </div>
          )}
          {Icon && label && <div className={classes.spacer} />}
          {Icon && (
            <Icon
              className={[classes.icon, arrowClassName, classes[`icon--${icon}`]]
                .filter(Boolean)
                .join(' ')}
              {...iconProps}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={classes.content}>
      {label && (
        <div
          className={[
            classes.label,
            !icon && classes['label-centered'],
            classes[`label-${labelStyle}`],
            labelClassName
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {label}
        </div>
      )}
      {Icon && label && <div className={classes.spacer} />}
      {Icon && (
        <Icon
          className={[classes.icon, classes[`icon--${icon}`]].filter(Boolean).join(' ')}
          {...iconProps}
        />
      )}
    </div>
  )
}

const elements: {
  [key: string]: React.ElementType
} = {
  a: 'a',
  button: 'button',
  div: 'div'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    el = 'button',
    type,
    reference,
    newTab,
    appearance = 'default',
    className: classNameFromProps,
    onClick,
    fullWidth,
    mobileFullWidth,
    htmlButtonType = 'button',
    size = 'default',
    disabled,
    href: hrefFromProps,
    id,
    url,
    hideBorders,
    hideHorizontalBorders,
    hideVerticalBorders,
    hideBottomBorderExceptLast,
    forceBackground
    // labelClassName,
    // arrowClassName,
    // isCMSFormSubmitButton
  } = props

  const href = hrefFromProps || generateReferenceURL({ type, reference, url })
  const [isHovered, setIsHovered] = useState(false)

  const [isAnimating, setIsAnimating] = useState(false)
  const [isAnimatingIn, setIsAnimatingIn] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)

  const animationDuration = 550

  useEffect(() => {
    let outTimer, inTimer

    if (isHovered) {
      setIsAnimating(true)
      setIsAnimatingIn(true)

      inTimer = setTimeout(() => {
        setIsAnimating(false)
        setIsAnimatingIn(false)
      }, animationDuration)

      setIsAnimatingOut(false)
    } else {
      setIsAnimating(true)
      setIsAnimatingIn(false)
      setIsAnimatingOut(true)

      outTimer = setTimeout(() => {
        setIsAnimating(false)
        setIsAnimatingOut(false)
      }, animationDuration)
    }

    return () => {
      clearTimeout(inTimer)
      clearTimeout(outTimer)
    }
  }, [isHovered, animationDuration])

  const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  const className = [
    classNameFromProps,
    classes.button,
    classes[`appearance--${appearance}`],
    fullWidth && classes['full-width'],
    mobileFullWidth && classes['mobile-full-width'],
    size && classes[`size--${size}`],
    isHovered && classes.isHovered,
    isAnimatingIn && classes.isAnimatingIn,
    isAnimatingOut && classes.animatingOut,
    isAnimating && classes.isAnimating,
    hideHorizontalBorders && classes.hideHorizontalBorders,
    hideVerticalBorders && classes.hideVerticalBorders,
    hideBorders && classes.hideBorders,
    hideBottomBorderExceptLast && classes.hideBottomBorderExceptLast,
    forceBackground && classes.forceBackground
  ]
    .filter(Boolean)
    .join(' ')

  if (el === 'link') {
    return (
      <Link href={href} prefetch={false} legacyBehavior passHref>
        <a
          className={className}
          {...newTabProps}
          onMouseEnter={() => {
            setIsHovered(true)
          }}
          onMouseLeave={() => {
            setIsHovered(false)
          }}
          id={id}
        >
          <ButtonContent {...props} />
        </a>
      </Link>
    )
  }

  const Element = elements[el]

  if (Element) {
    return (
      <Element
        ref={ref}
        type={htmlButtonType}
        className={className}
        {...newTabProps}
        href={href || null}
        onClick={onClick}
        onMouseEnter={() => {
          setIsHovered(true)
        }}
        onMouseLeave={() => {
          setIsHovered(false)
        }}
        disabled={disabled}
        id={id}
      >
        <ButtonContent appearance={appearance} {...props} />
      </Element>
    )
  }

  return null
})
Button.displayName = 'ButtonComponent'
