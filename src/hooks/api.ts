import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { usePopulation, useSetPopulation } from '~/states/population'
import { Prefecture, YearValue } from '~/types'

const API_ROOT = 'https://opendata.resas-portal.go.jp/api/v1'

const headers = {
  'X-API-KEY': import.meta.env.VITE_API_KEY,
}

export const usePrefectures = () =>
  useQuery<Prefecture[], Error>('prefectures', () =>
    fetch(`${API_ROOT}/prefectures`, { headers })
      .then((res) => res.json())
      .then((res) => res.result)
  )

/** 人口構成 API から「総人口」部分のデータを取得 */
const fetchPopulation = (prefCode: number): Promise<YearValue[]> =>
  fetch(`${API_ROOT}/population/composition/perYear?prefCode=${prefCode}`, {
    headers,
  })
    .then((res) => res.json())
    .then((res) => res.result.data[0].data)

/** チェックボックスが変更されたら、その都道府県の人口を取得する */
export const useFetchPopulation = (pref: Prefecture, checked: boolean) => {
  const population = usePopulation()
  const setPopulation = useSetPopulation()

  useEffect(() => {
    if (!checked || population[pref.prefCode]) return

    fetchPopulation(pref.prefCode).then((data) => {
      setPopulation(pref, data)
    })
  }, [checked, population, pref, setPopulation])
}
