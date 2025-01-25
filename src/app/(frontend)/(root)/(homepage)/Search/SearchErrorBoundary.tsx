'use client'

import React from 'react'

import { AlertCircle } from 'lucide-react'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class SearchErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error) {
    console.error('Search error:', error)
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="container flex items-center justify-center gap-2 px-4 py-8 text-center text-red-500">
          <AlertCircle className="h-4 w-4" />
          <span>Something went wrong with the search. Please try again.</span>
        </div>
      )
    }

    return this.props.children
  }
}
