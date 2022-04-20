import React, { useEffect } from 'react'
import { fetchPopulation, usePrefectureList } from '../hooks/api'
import { usePopulations, useSetPopulation } from '../states/population'
import { usePrefectureCodes } from '../states/prefectureCodes'

export const AutoFetcher = React.memo(function AutoFetcher() {
  const { data: prefectureList } = usePrefectureList()
  const prefectureCodes = usePrefectureCodes()
  const population = usePopulations()
  const setPopulation = useSetPopulation()

  // チェックボックスが変更されたら、その都道府県の人口を取得する
  useEffect(() => {
    prefectureCodes.forEach(async (prefCode) => {
      if (population[prefCode] || !prefectureList) return

      const pref = prefectureList.find((p) => p.prefCode === prefCode)
      if (!pref) {
        throw new Error(`prefCode ${prefCode} not found`)
      }

      const data = await fetchPopulation(prefCode)
      setPopulation(pref, data)
    })
  }, [prefectureCodes, prefectureList])

  return null
})
