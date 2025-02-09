/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'

import { useFormContext } from 'react-hook-form'

import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form'

import { Checkbox as CheckboxUi } from '@ui/checkbox'
import { Label } from '@ui/label'

import { ErrorComponent } from '../Error'
import { Width } from '../Width'

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<
      FieldErrorsImpl<{
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        [x: string]: any
      }>
    >
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    getValues: any
    register: UseFormRegister<FieldValues>
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    setValue: any
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  const props = register(name, { required: required })
  const { setValue } = useFormContext()

  return (
    <Width width={width}>
      <div className="flex items-center gap-2">
        <CheckboxUi
          defaultChecked={defaultValue}
          id={name}
          {...props}
          onCheckedChange={(checked) => {
            setValue(props.name, checked)
          }}
        />
        <Label htmlFor={name}>
          {required && (
            <span className="required">
              * <span className="sr-only">(required)</span>
            </span>
          )}
          {label}
        </Label>
      </div>
      {errors[name] && <ErrorComponent />}
    </Width>
  )
}
