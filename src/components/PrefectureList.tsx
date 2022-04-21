import React from 'react'
import { useFetchPopulation, usePrefectures } from '../hooks/api'
import {
  togglePrefectureCode,
  usePrefectureCodes,
} from '../states/prefectureCodes'
import { Prefecture } from '../types'
import { labelClass, liClass, ulClass } from './PrefectureList.css'

type CheckboxProps = {
  pref: Prefecture
  checked: boolean
}
const Checkbox = React.memo(function Checkbox({
  pref,
  checked,
}: CheckboxProps) {
  const toggle = togglePrefectureCode()

  return (
    <label className={labelClass}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => toggle(pref.prefCode)}
      />
      {pref.prefName}
    </label>
  )
})

export const PrefectureList = React.memo(function PrefectureList() {
  const { isLoading, error, data } = usePrefectures()
  const prefectureCodes = usePrefectureCodes()

  useFetchPopulation(prefectureCodes, data)

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
          <Checkbox
            pref={pref}
            checked={prefectureCodes.includes(pref.prefCode)}
          />
        </li>
      ))}

      {/* 最後の行が崩れないように空の li を並べる */}
      {data?.map((pref) => (
        <li key={pref.prefCode} className={liClass}></li>
      ))}
    </ul>
  )
})
