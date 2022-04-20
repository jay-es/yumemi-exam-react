import React, { useCallback } from 'react'
import { usePrefectureList } from '../hooks/api'
import {
  togglePrefectureCode,
  usePrefectureCodes,
} from '../states/prefectureCodes'
import { Prefecture } from '../types'
import { labelClass, liClass, ulClass } from './Prefectures.css'

type CheckboxProps = {
  pref: Prefecture
}
const Checkbox: React.FC<CheckboxProps> = ({ pref }) => {
  const prefectureCodes = usePrefectureCodes()
  const toggle = togglePrefectureCode()

  const checked = prefectureCodes.includes(pref.prefCode)
  const handleChange = useCallback(() => toggle(pref.prefCode), [checked])

  return (
    <label className={labelClass}>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      {pref.prefName}
    </label>
  )
}

export const Prefectures = () => {
  const { isLoading, error, data } = usePrefectureList()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <ul className={ulClass}>
      {data?.map((pref) => (
        <li key={pref.prefCode} className={liClass}>
          <Checkbox pref={pref} />
        </li>
      ))}
    </ul>
  )
}
