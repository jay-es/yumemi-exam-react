import { useQuery } from 'react-query'
import { Prefecture } from '../types'

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
