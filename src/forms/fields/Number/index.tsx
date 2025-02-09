'use client'

import React from 'react'

import { isNumber } from '@utils/isNumber'

import ErrorComponent from '../../Error'
import Label from '../../Label'
import { FieldProps } from '../types'
import { useField } from '../useField'
import classes from './index.module.scss'

export const NumberInput: React.FC<FieldProps<number>> = (props) => {
  const {
    path,
    required = false,
    validate,
    label,
    placeholder,
    onChange: onChangeFromProps,
    className,
    initialValue,
  } = props

  const defaultValidateFunction = React.useCallback(
    (fieldValue: unknown): string | true => {
      if (typeof fieldValue !== 'number' && typeof fieldValue !== 'string') {
        return true // Or some other appropriate error/handling
      }
      const stringVal = String(fieldValue)
      if (required && (!fieldValue || stringVal.length === 0)) {
        return 'Please enter a value.'
      }

      if (fieldValue && !isNumber(fieldValue)) {
        return 'This field can only be a number.'
      }

      return true
    },
    [required],
  )

  const { onChange, value, showError, errorMessage } = useField<number>({
    initialValue,
    onChange: onChangeFromProps,
    path,
    validate: validate || defaultValidateFunction,
    required,
  })

  return (
    <div className={[classes.wrap, className].filter(Boolean).join(' ')}>
      <ErrorComponent showError={showError} message={errorMessage} />
      <Label htmlFor={path} label={label} required={required} />
      <input
        className={classes.input}
        value={value || ''}
        onChange={(e) => {
          onChange(Number(e.target.value))
        }}
        placeholder={placeholder}
        type="number"
        id={path}
        name={path}
      />
    </div>
  )
}
