/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'

import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form'

import { Input } from '@ui/input'
import { Label } from '@ui/label'

import { ErrorComponent } from '../Error'
import { Width } from '../Width'

export const NumberComponent: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
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
      <Input
        defaultValue={defaultValue}
        id={name}
        type="number"
        {...register(name, { required })}
      />
      {errors[name] && <ErrorComponent />}
    </Width>
  )
}
