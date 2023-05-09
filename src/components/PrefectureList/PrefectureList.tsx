import React, { useEffect } from 'react'
import { usePrefectures } from '~/hooks/api'
import { useSetPrefectures } from '~/states'
import { PrefectureListItem } from './PrefectureListItem'
import { liClass, ulClass } from './PrefectureList.css'

export const PrefectureList = React.memo(function PrefectureList() {
  const { isLoading, error, data } = usePrefectures()
  const setPrefectures = useSetPrefectures()

  useEffect(() => {
    if (data) {
      setPrefectures(data)
    }
  }, [data, setPrefectures])

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
          <PrefectureListItem pref={pref} />
        </li>
      ))}

      {/* 最後の行が崩れないように空の li を並べる */}
      {data?.map((pref) => (
        <li key={pref.prefCode} className={liClass}></li>
      ))}
    </ul>
  )
})
