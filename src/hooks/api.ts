import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { usePopulations, useSetPopulation } from '../states/population'
import { Prefecture, YearValue } from '../types'

const headers = {
  'X-API-KEY': import.meta.env.VITE_API_KEY,
}

export const usePrefectureList = () =>
  useQuery<Prefecture[], Error>('prefectures', () =>
    fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      headers,
    })
      .then((res) => res.json())
      .then((res) => res.result)
  )

/** 人口構成 API から「総人口」部分のデータを取得 */
const fetchPopulation = (prefCode: number): Promise<YearValue[]> =>
  fetch(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
    { headers }
  )
    .then((res) => res.json())
    .then((res) => res.result.data[0].data)

/** チェックボックスが変更されたら、その都道府県の人口を取得する */
export const useFetchPopulation = (
  prefectureCodes: number[],
  prefectureList: Prefecture[] | undefined
) => {
  const population = usePopulations()
  const setPopulation = useSetPopulation()

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
}
