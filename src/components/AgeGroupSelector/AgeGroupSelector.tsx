import React, { useCallback } from 'react'

import { useAgeGroup } from '~/states'
import type { AgeGroup } from '~/types'

import { selectClass } from './AgeGroupSelector.css'

const listItems = ['総人口', '年少人口', '生産年齢人口', '老年人口'] as const
const isAgeGroup = (value: string): value is AgeGroup =>
  (listItems as ReadonlyArray<string>).includes(value)

export const AgeGroupSelector = React.memo(function AgeGroupSelector() {
  const [ageGroup, setAgeGroup] = useAgeGroup()

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (isAgeGroup(event.target.value)) {
        setAgeGroup(event.target.value)
      }
    },
    [setAgeGroup]
  )

  return (
    <select className={selectClass} value={ageGroup} onChange={handleChange}>
      {listItems.map((item) => (
        <option key={item} label={item} value={item} />
      ))}
    </select>
  )
})
