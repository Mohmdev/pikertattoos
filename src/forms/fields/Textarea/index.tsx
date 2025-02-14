'use client'

import React from 'react'

import { CopyToClipboard } from '@components/dynamic/CopyToClipboard'

import ErrorComponent from '../../Error'
import Label from '../../Label'
import { FieldProps } from '../types'
import { useField } from '../useField'
import classes from './index.module.scss'

export const Textarea: React.FC<
  FieldProps<string> & {
    rows?: number
    copy?: boolean
    elementAttributes?: React.InputHTMLAttributes<HTMLTextAreaElement>
  }
> = (props) => {
  const {
    path,
    required = false,
    validate,
    label,
    placeholder,
    onChange: onChangeFromProps,
    rows = 3,
    initialValue,
    className,
    copy,
    elementAttributes = {
      autoComplete: 'off',
      autoCorrect: 'off',
      autoCapitalize: 'none',
    },
  } = props

  const defaultValidateFunction = React.useCallback(
    (fieldValue: unknown): string | true => {
      if (required && !fieldValue) {
        return 'Please enter a value.'
      }

      if (fieldValue && typeof fieldValue !== 'string') {
        return 'This field can only be a string.'
      }

      return true
    },
    [required],
  )

  const { onChange, value, showError, errorMessage } = useField<string>({
    initialValue,
    onChange: onChangeFromProps,
    path,
    validate: validate || defaultValidateFunction,
    required,
  })

  return (
    <div className={[className, classes.wrap].filter(Boolean).join(' ')}>
      <ErrorComponent showError={showError} message={errorMessage} />
      <Label
        htmlFor={path}
        label={label}
        required={required}
        actionsSlot={copy && <CopyToClipboard value={value} />}
      />
      <textarea
        {...elementAttributes}
        rows={rows}
        className={classes.textarea}
        value={value || ''}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        placeholder={placeholder}
        id={path}
        name={path}
      />
    </div>
  )
}
