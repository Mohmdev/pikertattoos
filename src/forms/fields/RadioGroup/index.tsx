'use client'

import React, { useId } from 'react'

import ErrorComponent from '../../Error'
import Label from '../../Label'
import { FieldProps } from '../types'
import { useField } from '../useField'
import classes from './index.module.scss'

export type Option = {
  label: string | React.ReactElement
  value: string
}

const RadioGroup: React.FC<
  FieldProps<string> & {
    options: Option[]
    layout?: 'vertical' | 'horizontal'
    hidden?: boolean
  }
> = (props) => {
  const {
    path,
    required = false,
    validate,
    label,
    options,
    onChange: onChangeFromProps,
    initialValue,
    layout,
    hidden,
    onClick,
    className,
  } = props

  const id = useId()

  const defaultValidateFunction = React.useCallback(
    (fieldValue: unknown): string | true => {
      if (required && !fieldValue) {
        return 'Please make a selection.'
      }

      if (typeof fieldValue !== 'string') {
        return 'This field has an invalid selection'
      }

      if (
        fieldValue &&
        !options.find((option) => option && option.value === fieldValue)
      ) {
        return 'This field has an invalid selection'
      }

      return true
    },
    [required, options],
  )

  const { onChange, value, showError, errorMessage } = useField<string>({
    initialValue,
    onChange: onChangeFromProps,
    path,
    validate: validate || defaultValidateFunction,
    required,
  })

  return (
    <div
      className={[
        className,
        classes.wrap,
        layout && classes[`layout--${layout}`],
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <ErrorComponent showError={showError} message={errorMessage} />
      <Label htmlFor={path} label={label} required={required} />
      <ul className={classes.ul}>
        {options.map((option, index) => {
          const isSelected = String(option.value) === String(value)
          const optionId = `${id}-${index}`

          return (
            <li key={index} className={classes.li}>
              <label
                htmlFor={optionId}
                className={classes.radioWrap}
                onClick={onClick}
              >
                <input
                  id={optionId}
                  type="radio"
                  checked={isSelected}
                  onChange={() => {
                    onChange(option.value)
                  }}
                />
                <span
                  className={[
                    classes.radio,
                    isSelected && classes.selected,
                    hidden && classes.hidden,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                />
                <span className={classes.label}>{option.label}</span>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default RadioGroup
