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
import React from 'react'
import { Line } from 'react-chartjs-2'
import { useGraphData } from '~/states'

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

  return <Line data={graphData} />
})
