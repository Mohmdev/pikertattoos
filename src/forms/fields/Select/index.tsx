/* eslint-disable */

'use client'

import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'

import ReactSelect from 'react-select'

import ErrorComponent from '../../Error'
import Label from '../../Label'
import { useFormField } from '../../useFormField'
import { FieldProps } from '../types'
import classes from './index.module.scss'

type Option = {
  label: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  value: any
}

type SelectProps = FieldProps<string | string[]> & {
  options: Option[]
  isMulti?: boolean
  isClearable?: boolean
  isSearchable?: boolean
  components?: {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    [key: string]: React.FC<any>
  }
  value?: string | string[]
  onMenuScrollToBottom?: () => void
}

export const Select: React.FC<SelectProps> = (props) => {
  const {
    path,
    required,
    validate,
    label,
    options,
    onChange,
    className,
    initialValue: initialValueFromProps, // allow external control
    isMulti,
    isClearable,
    components,
    value: valueFromProps, // allow external control
    description,
    disabled,
    onMenuScrollToBottom,
    isSearchable = true,
  } = props

  // const id = useId()
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const ref = useRef<any>(null)
  const prevValueFromProps = useRef<string | string[] | undefined>(
    valueFromProps,
  )

  const defaultValidateFunction = React.useCallback(
    (fieldValue: Option | Option[]): string | true => {
      // need to check all types of values here, strings, arrays, and objects
      if (
        required &&
        (!fieldValue ||
          (Array.isArray(fieldValue)
            ? !fieldValue.length
            : !(typeof fieldValue === 'string'
                ? fieldValue
                : fieldValue?.value)))
      ) {
        return 'This field is required.'
      }

      const isValid = Array.isArray(fieldValue)
        ? fieldValue.every((v) =>
            options.find(
              (item) => item.value === (typeof v === 'string' ? v : v?.value),
            ),
          )
        : options.find(
            (item) =>
              item.value ===
              (typeof fieldValue === 'string' ? fieldValue : fieldValue?.value),
          )

      if (!isValid) {
        return 'Selected value is not valid option.'
      }

      return true
    },
    [options, required],
  )

  const fieldFromContext = useFormField<string | string[]>({
    path: path!,
    validate: validate || defaultValidateFunction,
    initialValue: initialValueFromProps,
  })

  const {
    value: valueFromContext,
    showError,
    setValue,
    errorMessage,
  } = fieldFromContext

  const [internalState, setInternalState] = useState<
    Option | Option[] | undefined
  >(() => {
    const initialValue = valueFromContext || initialValueFromProps

    if (initialValue && Array.isArray(initialValue)) {
      const matchedOption =
        options?.filter((item) => {
          // `item.value` could be string or array, i.e. `isMulti`
          if (Array.isArray(item.value)) {
            return item.value.find((x) => initialValue.find((y) => y === x))
          }

          return initialValue.find((x) => x === item.value)
        }) || []

      return matchedOption
    }

    return options?.find((item) => item.value === initialValue) || undefined
  })

  const setFormattedValue = useCallback(
    (incomingSelection?: string | string[]) => {
      let isDifferent = false
      let differences

      if (incomingSelection && !internalState) {
        isDifferent = true
      }

      if (incomingSelection && internalState) {
        if (Array.isArray(incomingSelection) && Array.isArray(internalState)) {
          const internalValues = internalState.map((item) => item.value)
          differences = incomingSelection.filter((x) =>
            internalValues.includes(x),
          )
          isDifferent = differences.length > 0
        }

        if (
          typeof incomingSelection === 'string' &&
          typeof internalState === 'string'
        ) {
          isDifferent = incomingSelection !== internalState
        }

        if (
          typeof incomingSelection === 'string' &&
          typeof internalState === 'object' &&
          internalState !== null &&
          'value' in internalState
        ) {
          isDifferent = incomingSelection !== internalState.value
        }
      }

      if (incomingSelection !== undefined && isDifferent) {
        let newValue: Option | Option[] | undefined = undefined

        if (Array.isArray(incomingSelection)) {
          newValue =
            options?.filter((item) =>
              incomingSelection.find((x) => x === item.value),
            ) || []
        }

        if (typeof incomingSelection === 'string') {
          newValue =
            options?.find((item) => item.value === incomingSelection) ||
            undefined
        }

        setInternalState(newValue)
      }
    },
    [internalState, options],
  )

  // allow external control
  useEffect(() => {
    // compare prevValueFromProps.current to valueFromProps
    // this is bc components which are externally control the value AND rendered inside the form context
    // will throw an infinite loop after the form state is updated-even if the value is the same, it is a new instance
    if (valueFromProps !== prevValueFromProps.current) {
      setFormattedValue(valueFromProps)
      prevValueFromProps.current = valueFromProps
    }
  }, [valueFromProps, setFormattedValue, prevValueFromProps])

  const handleChange = useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (incomingSelection: any) => {
      let selectedOption

      if (Array.isArray(incomingSelection)) {
        selectedOption = incomingSelection.map((item) => item.value)
      } else if (incomingSelection) {
        selectedOption = incomingSelection.value
      } else {
        selectedOption = null
      }
      setInternalState(incomingSelection)

      if (typeof setValue === 'function') {
        setValue(selectedOption)
      }

      if (typeof onChange === 'function') {
        onChange(selectedOption)
      }
    },
    [onChange, setValue],
  )

  return (
    <div
      className={[
        className,
        classes.select,
        showError && classes.error,
        isSearchable && classes.isSearchable,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <ErrorComponent showError={showError} message={errorMessage} />
      <Label htmlFor={path} label={label} required={required} />
      <ReactSelect
        ref={ref}
        isMulti={isMulti}
        isClearable={isClearable}
        instanceId={'test'}
        onChange={handleChange}
        options={options}
        value={internalState}
        className={classes.reactSelect}
        classNamePrefix="rs"
        components={components}
        isDisabled={disabled}
        onMenuScrollToBottom={onMenuScrollToBottom}
        noOptionsMessage={() => 'No options'}
        isSearchable={isSearchable}
      />
      {description && <div className={classes.description}>{description}</div>}
    </div>
  )
}
