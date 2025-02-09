/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'

import { Controller } from 'react-hook-form'

import type { CountryField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'

import { Label } from '@ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select'

import { ErrorComponent } from '../Error'
import { Width } from '../Width'
import { countryOptions } from './options'

export const Country: React.FC<
  CountryField & {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    control: Control<FieldValues, any>
    errors: Partial<
      FieldErrorsImpl<{
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        [x: string]: any
      }>
    >
  }
> = ({ name, control, errors, label, required, width }) => {
  return (
    <Width width={width}>
      <Label className="" htmlFor={name}>
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field: { onChange, value } }) => {
          const controlledValue = countryOptions.find((t) => t.value === value)

          return (
            <Select
              onValueChange={(val) => onChange(val)}
              value={controlledValue?.value}
            >
              <SelectTrigger className="w-full" id={name}>
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent>
                {countryOptions.map(({ label, value }) => {
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          )
        }}
        rules={{ required }}
      />
      {errors[name] && <ErrorComponent />}
    </Width>
  )
}
