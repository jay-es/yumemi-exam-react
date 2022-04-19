import React from 'react'
import { usePrefectureList } from '../hooks/api'
import { liClass, ulClass } from './Prefectures.css'

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
          <label>
            <input type="checkbox" value={pref.prefCode} />
            {pref.prefName}
          </label>
        </li>
      ))}
    </ul>
  )
}
