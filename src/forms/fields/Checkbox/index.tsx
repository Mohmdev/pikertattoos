'use client'

import React, { useEffect } from 'react'

import Label from '@forms/Label'

import { CheckIcon } from '@payloadcms/ui'
import ErrorComponent from '../../Error'
import { FieldProps } from '../types'
import { useField } from '../useField'
import classes from './index.module.scss'

export const Checkbox: React.FC<
  FieldProps<boolean> & {
    checked?: boolean
  }
> = (props) => {
  const {
    path,
    required,
    label,
    onChange: onChangeFromProps,
    initialValue,
    validate,
    className,
    checked: checkedFromProps,
    disabled,
  } = props

  const [checked, setChecked] = React.useState<boolean | undefined | null>(
    initialValue || false,
  )
  const prevChecked = React.useRef<boolean | undefined | null>(checked)
  const prevContextValue = React.useRef<boolean | undefined | null>(
    initialValue,
  )

  const defaultValidateFunction = React.useCallback(
    (fieldValue: unknown): string | true => {
      if (typeof fieldValue !== 'boolean') {
        return true // Or a more specific error message if you prefer
      }

      if (required && !fieldValue) {
        return 'This field is required.'
      }

      return true
    },
    [required],
  )

  const {
    onChange,
    value: valueFromContext,
    showError,
    errorMessage,
  } = useField<boolean>({
    initialValue,
    onChange: onChangeFromProps,
    path,
    validate: validate || defaultValidateFunction,
    required,
  })

  // allow external control
  useEffect(() => {
    if (
      checkedFromProps !== undefined &&
      checkedFromProps !== prevChecked.current &&
      checkedFromProps !== checked
    ) {
      setChecked(checkedFromProps)
    }

    prevChecked.current = checkedFromProps
  }, [checkedFromProps, checked])

  // allow context control
  useEffect(() => {
    if (
      valueFromContext !== undefined &&
      valueFromContext !== prevContextValue.current &&
      valueFromContext !== checked
    ) {
      setChecked(valueFromContext)
    }

    prevContextValue.current = valueFromContext
  }, [valueFromContext, checked])

  return (
    <div
      className={[
        className,
        classes.checkbox,
        showError && classes.error,
        checked && classes.checked,
        disabled && classes.disabled,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={classes.errorWrap}>
        <ErrorComponent showError={showError} message={errorMessage} />
      </div>
      <input
        className={classes.htmlInput}
        type="checkbox"
        name={path}
        id={path}
        checked={Boolean(checked)}
        readOnly
        disabled={disabled}
        tabIndex={-1}
      />
      <button
        type="button"
        className={classes.button}
        onClick={() => {
          if (!disabled) onChange(!checked)
        }}
        disabled={disabled}
      >
        <span className={classes.input}>
          <CheckIcon />
        </span>
        <Label
          className={classes.label}
          htmlFor={path}
          label={label}
          required={required}
        />
      </button>
    </div>
  )
}
