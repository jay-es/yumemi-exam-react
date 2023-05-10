import type { Prefecture, YearValue } from '~/types'

const API_ROOT = 'https://opendata.resas-portal.go.jp/api/v1'

const headers = {
  'X-API-KEY': import.meta.env.VITE_API_KEY,
}

/** 都道府県データを取得 */
export const fetchPrefectures = (): Promise<Prefecture[]> =>
  fetch(`${API_ROOT}/prefectures`, { headers })
    .then((res) => res.json())
    .then((res) => res.result)

/** 人口構成 API から「総人口」部分のデータを取得 */
export const fetchPrefPopulation = (prefCode: number): Promise<YearValue[]> =>
  fetch(`${API_ROOT}/population/composition/perYear?prefCode=${prefCode}`, {
    headers,
  })
    .then((res) => res.json())
    .then((res) => res.result.data[0].data)
