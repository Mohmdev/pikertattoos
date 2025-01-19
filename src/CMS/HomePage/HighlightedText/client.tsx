'use client'

import React from 'react'

import { FieldLabel, TextInput, useField } from '@payloadcms/ui'

import { TextFieldClientProps } from 'payload'

type HighlightedTextProps = {
  checkboxFieldPath: string
} & TextFieldClientProps

export const HighlightedTextComponent: React.FC<HighlightedTextProps> = ({
  field,
  path,
  checkboxFieldPath
}) => {
  const { value, setValue } = useField<string>({ path: path || field.name })

  // Get the checkbox value
  const checkboxValue = useField<boolean>({ path: checkboxFieldPath })

  return (
    <div>
      <FieldLabel htmlFor={`field-${path}`} label={field.label} />
      <TextInput
        value={value}
        onChange={setValue}
        path={path || field.name}
        readOnly={!checkboxValue.value}
      />
    </div>
  )
}
