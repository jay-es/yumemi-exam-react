import { useQuery } from 'react-query'
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
export const fetchPopulation = (prefCode: number): Promise<YearValue[]> =>
  fetch(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
    { headers }
  )
    .then((res) => res.json())
    .then((res) => res.result.data[0].data)
