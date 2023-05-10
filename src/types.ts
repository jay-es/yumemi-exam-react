import type { ChartData } from 'chart.js'

export type Prefecture = {
  prefCode: number
  prefName: string
}

export type AgeGroup = '総人口' | '年少人口' | '生産年齢人口' | '老年人口'

type YearValue = {
  year: number
  value: number
}

export type Response = {
  label: AgeGroup
  data: YearValue[]
}[]

export type GraphData = ChartData<'line'>
