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

import { usePopulation } from '~/states/population'
import { usePrefCodes } from '~/states/prefCodes'
import { isNonNullable } from '~/utils/isNonNullable'

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
  const prefCodes = usePrefCodes()
  const population = usePopulation()

  const data = useMemo(() => {
    const values = prefCodes.map((p) => population[p]).filter(isNonNullable)
    const labels = values[0]?.data.map((p) => p.year)
    const datasets = values.map((p) => ({
      label: p.prefName,
      data: p.data.map((d) => d.value),
      borderColor: `hsl(${p.prefCode * PREF_RATIO}, 75%, 50%)`,
      backgroundColor: `hsl(${p.prefCode * PREF_RATIO}, 100%, 90%)`,
    }))

    return { labels, datasets }
  }, [prefCodes, population])

  return <Line data={data} />
})
