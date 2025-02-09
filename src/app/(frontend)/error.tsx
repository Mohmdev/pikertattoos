'use client'

import NextError from 'next/error'
import React from 'react'

import { Gutter } from '@components/layout/Gutter'

export default function ErrorComponent() {
  return (
    <Gutter>
      <h2>Something went wrong</h2>
      <NextError statusCode={0} withDarkMode />
    </Gutter>
  )
}
