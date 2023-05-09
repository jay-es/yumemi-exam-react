import { ChartData } from 'chart.js'

export type Prefecture = {
  prefCode: number
  prefName: string
}

export type YearValue = {
  year: number
  value: number
}

export type GraphData = ChartData<'line'>
