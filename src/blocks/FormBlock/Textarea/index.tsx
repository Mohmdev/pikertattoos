/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'

import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form'

import { Label } from '@ui/label'
import { Textarea as TextAreaComponent } from '@ui/textarea'

import { ErrorComponent } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required,
  rows = 3,
  width,
}) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>

      <TextAreaComponent
        defaultValue={defaultValue}
        id={name}
        rows={rows}
        {...register(name, { required: required })}
      />

      {errors[name] && <ErrorComponent />}
    </Width>
  )
}
