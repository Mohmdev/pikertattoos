'use client'

import React, { Fragment, useCallback, useState } from 'react'

import { toast, useAuth } from '@payloadcms/ui'

import { cn } from '@utils/cn'

import type { User } from '@payload-types'

import styles from './index.module.scss'

const SuccessMessage: React.FC = () => (
  <div>
    Database seeded! You can now{' '}
    <a target="_blank" href="/">
      visit your website
    </a>
  </div>
)

export const SeedButton: React.FC = () => {
  const { user } = useAuth<User>()
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState(null)

  const getButtonText = () => {
    if (user?.role !== 'admin') return 'You need admin access level to perform this action'
    if (loading) return 'Seeding...'
    if (seeded) return 'Database Seeded!'
    if (error) return `Error: ${error}`
    return 'Seed Database'
  }

  const resetStates = useCallback(() => {
    setLoading(false)
    setSeeded(false)
    setError(null)
  }, [])

  const handleClick = useCallback(
    async (e) => {
      e.preventDefault()

      if (seeded) {
        toast.info('Database already seeded.')
        return
      }
      if (loading) {
        toast.info('Seeding already in progress.')
        return
      }
      if (error) {
        toast.error(`An error occurred, please refresh and try again.`)
        return
      }

      setLoading(true)

      try {
        toast.promise(
          fetch('/next/seed', {
            method: 'POST',
            credentials: 'include'
          }).then((res) => {
            if (!res.ok) {
              throw new Error('An error occurred while seeding.')
            }
            setSeeded(true)
            return res
          }),
          {
            loading: 'Seeding with data....',
            success: <SuccessMessage />,
            error: 'An error occurred while seeding.'
          }
        )

        const timeoutId = setTimeout(resetStates, 3000)
        // Cleanup timeout if component unmounts
        return () => clearTimeout(timeoutId)
      } catch (err) {
        setError(err.message)
        setLoading(false)

        // Also reset states after error after 3 seconds
        const timeoutId = setTimeout(resetStates, 3000)
        return () => clearTimeout(timeoutId)
      }
    },
    [loading, seeded, error, resetStates]
  )

  return (
    <Fragment>
      <button
        className={cn(styles.seedButton, styles.firstChild)}
        onClick={handleClick}
        disabled={loading || seeded || error || user?.role !== 'admin'}
      >
        {getButtonText()}
      </button>
    </Fragment>
  )
}
