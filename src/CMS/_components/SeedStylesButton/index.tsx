'use client'

import React, { Fragment, useCallback, useState } from 'react'

import { toast, useAuth } from '@payloadcms/ui'

import type { User } from '@payload-types'

import styles from '../SeedButton/index.module.scss'

const SuccessMessage: React.FC = () => (
  <div>
    Styles seeding complete! You can now{' '}
    <a target="_blank" href="/">
      visit your website
    </a>
  </div>
)

export const SeedStylesButton: React.FC = () => {
  const { user } = useAuth<User>()
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState(null)

  const getButtonText = () => {
    if (user?.role !== 'admin') return 'You need admin access level to perform this action'
    if (loading) return 'Seeding Styles...'
    if (seeded) return 'Styles Seeding Complete!'
    if (error) return `Error: ${error}`
    return 'Seed Styles'
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
        toast.info('Styles already seeded.')
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
          fetch('/next/seed-styles', {
            method: 'POST',
            credentials: 'include'
          }).then((res) => {
            if (!res.ok) {
              throw new Error('An error occurred while seeding styles.')
            }
            setSeeded(true)
            return res
          }),
          {
            loading: 'Seeding styles data...',
            success: <SuccessMessage />,
            error: 'An error occurred while seeding styles.'
          }
        )

        const timeoutId = setTimeout(resetStates, 3000)
        return () => clearTimeout(timeoutId)
      } catch (err) {
        setError(err.message)
        setLoading(false)

        const timeoutId = setTimeout(resetStates, 3000)
        return () => clearTimeout(timeoutId)
      }
    },
    [loading, seeded, error, resetStates]
  )

  return (
    <Fragment>
      <button
        className={styles.seedButton}
        onClick={handleClick}
        disabled={loading || seeded || error || user?.role !== 'admin'}
      >
        {getButtonText()}
      </button>
    </Fragment>
  )
}
