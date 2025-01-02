'use client'

import React, { Fragment, useCallback, useState } from 'react'

import { toast, useAuth } from '@payloadcms/ui'

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
          new Promise((resolve, reject) => {
            try {
              fetch('/next/seed', { method: 'POST', credentials: 'include' })
                .then((res) => {
                  if (res.ok) {
                    resolve(true)
                    setSeeded(true)
                  } else {
                    reject('An error occurred while seeding.')
                  }
                })
                .catch((error) => {
                  reject(error)
                })
            } catch (error) {
              reject(error)
            }
          }),
          {
            loading: 'Seeding with data....',
            success: <SuccessMessage />,
            error: 'An error occurred while seeding.'
          }
        )
      } catch (err) {
        setError(err)
      }
    },
    [loading, seeded, error]
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
