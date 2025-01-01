'use client'

import React from 'react'
import NextError from 'next/error'

// import { Gutter } from '@components/layout/Gutter'

export default function Error() {
  return (
    <div>
      <h2>Something went wrong.</h2>
      <NextError statusCode={0} />
    </div>
  )
}