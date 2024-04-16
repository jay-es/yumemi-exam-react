import { atom, useAtom, useAtomValue } from 'jotai'
import { atomFamily, loadable } from 'jotai/utils'

import type { AgeGroup, GraphData, Prefecture } from '~/types'

import { fetchPrefectures, fetchPrefPopulation } from './api'

// データ種別
const ageGroupState = atom<AgeGroup>('総人口')
export const useAgeGroup = () => useAtom(ageGroupState)

// 都道府県データ
const prefecturesState = atom<Promise<Prefecture[]>>(fetchPrefectures)

export const usePrefectures = () => useAtomValue(prefecturesState)

// 都道府県ごとのチェック状態
const checkedStateFamily = atomFamily((prefCode: number) =>
  atom([13, 23, 27].includes(prefCode))
)

export const useChecked = (prefCode: number) =>
  useAtom(checkedStateFamily(prefCode))

// 都道府県ごとの人口データ
const populationStateFamily = atomFamily((prefCode: number) =>
  atom(() => fetchPrefPopulation(prefCode))
)

// グラフ用データ
const graphDataState = atom(async (get): Promise<GraphData> => {
  const prefectures = await get(prefecturesState)
  const checkedPrefectures = prefectures.filter((pref) =>
    get(checkedStateFamily(pref.prefCode))
  )
  const responses = await Promise.all(
    checkedPrefectures.map((pref) => get(populationStateFamily(pref.prefCode)))
  )

  const ageGroup = get(ageGroupState)
  const populations = responses.map(
    (res) => res.find((v) => v.label === ageGroup)?.data
  )

  // 360 度を 2 周
  const PREF_RATIO = (360 / 47) * 2

  const labels = populations[0]?.map((p) => p.year)
  const datasets = checkedPrefectures.map((p, i) => ({
    label: p.prefName,
    data: populations[i]?.map((v) => v.value) ?? [],
    borderColor: `hsl(${p.prefCode * PREF_RATIO}, 75%, 50%)`,
    backgroundColor: `hsl(${p.prefCode * PREF_RATIO}, 100%, 90%)`,
  }))

  return { labels, datasets }
})

export const useGraphData = () => useAtomValue(loadable(graphDataState))
