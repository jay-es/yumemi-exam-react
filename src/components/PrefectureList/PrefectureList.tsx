import React from 'react'

import { usePrefectures } from '~/states'

import { liClass, ulClass } from './PrefectureList.css'
import { PrefectureListItem } from './PrefectureListItem'

export const PrefectureList = React.memo(function PrefectureList() {
  const prefectures = usePrefectures()

  return (
    <ul className={ulClass}>
      {prefectures.map((pref) => (
        <li key={pref.prefCode} className={liClass}>
          <PrefectureListItem pref={pref} />
        </li>
      ))}

      {/* 最後の行が崩れないように空の li を並べる */}
      {prefectures.map((pref) => (
        <li key={pref.prefCode} className={liClass}></li>
      ))}
    </ul>
  )
})
