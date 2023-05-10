import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import React, { useRef } from 'react'
import { Line } from 'react-chartjs-2'
import { useGraphData } from '~/states'
import { GraphData } from '~/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const Graph = React.memo(function Graph() {
  const graphData = useGraphData()
  const data = useRef<GraphData | null>(null)

  // // 成功時のデータを保持
  if (graphData.state === 'hasValue') {
    data.current = graphData.contents
  }

  return data.current && <Line data={data.current} />
})
