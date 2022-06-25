import React from 'react'
import { usePrefectures } from '~/hooks/api'
import { usePrefCodes } from '~/states/prefCodes'
import { Checkbox } from './Checkbox'
import { liClass, ulClass } from './PrefectureList.css'

export const PrefectureList = React.memo(function PrefectureList() {
  const { isLoading, error, data } = usePrefectures()
  const prefCodes = usePrefCodes()

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
          <Checkbox pref={pref} checked={prefCodes.includes(pref.prefCode)} />
        </li>
      ))}

      {/* 最後の行が崩れないように空の li を並べる */}
      {data?.map((pref) => (
        <li key={pref.prefCode} className={liClass}></li>
      ))}
    </ul>
  )
})
