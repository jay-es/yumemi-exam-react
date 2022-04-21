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
import React, { useMemo } from 'react'
import { Line } from 'react-chartjs-2'

import { usePopulations } from '../states/population'
import { usePrefectureCodes } from '../states/prefectureCodes'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// 360 度を 2 周
const PREF_RATIO = (360 / 47) * 2

export const Graph = React.memo(function Graph() {
  const prefectureCodes = usePrefectureCodes()
  const population = usePopulations()

  const data = useMemo(() => {
    const values = prefectureCodes.map((p) => population[p]).filter(Boolean)
    const labels = values[0]?.data.map((p) => p.year)
    const datasets = values.map((p) => ({
      label: p.prefName,
      data: p.data.map((d) => d.value),
      borderColor: `hsl(${p.prefCode * PREF_RATIO}, 75%, 50%)`,
      backgroundColor: `hsl(${p.prefCode * PREF_RATIO}, 100%, 90%)`,
    }))

    return { labels, datasets }
  }, [prefectureCodes, population])

  return <Line data={data} />
})
