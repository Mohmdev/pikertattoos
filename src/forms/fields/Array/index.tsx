import * as React from 'react'

import { TrashIcon } from '@icons/TrashIcon'
import { CircleIconButton } from '@components/CircleIconButton'

import { useArray } from './context'
import classes from './index.module.scss'

type ArrayRowProps = {
  children: React.ReactNode
  className?: string
  index: number
  allowRemove: boolean
}
export const ArrayRow: React.FC<ArrayRowProps> = (props) => {
  const { removeRow } = useArray()
  const { children, allowRemove, index, className } = props

  return (
    <div className={[className, classes.row].filter(Boolean).join(' ')}>
      <div className={classes.children}>{children}</div>

      {allowRemove && (
        <button
          type="button"
          onClick={() => {
            removeRow(index)
          }}
          className={classes.trashButton}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  )
}

type AddRowProps = {
  className?: string
  label?: string
  singularLabel?: string
  pluralLabel?: string
  baseLabel?: string
}

export const AddArrayRow: React.FC<AddRowProps> = ({
  className,
  label: labelFromProps,
  baseLabel = 'Add',
  singularLabel = 'one',
  pluralLabel = 'another'
}) => {
  const { addRow, uuids } = useArray()

  const label =
    labelFromProps ||
    (!uuids?.length
      ? `${baseLabel} ${pluralLabel}`
      : `${baseLabel} ${singularLabel}`)

  return (
    <CircleIconButton className={className} onClick={addRow} label={label} />
  )
}
