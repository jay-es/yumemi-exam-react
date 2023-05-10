import {
  atomFamily,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'

import type { GraphData, Prefecture } from '~/types'

import { fetchPrefectures, fetchPrefPopulation } from './api'

// 都道府県データ
export const prefecturesState = selector<Prefecture[]>({
  key: 'prefectures',
  get: fetchPrefectures,
})

export const usePrefectures = () => useRecoilValue(prefecturesState)

// 都道府県ごとのチェック状態
const checkedStateFamily = atomFamily({
  key: 'checked',
  default: (prefCode: number) => [13, 23, 27].includes(prefCode),
})

export const useChecked = (prefCode: number) =>
  useRecoilState(checkedStateFamily(prefCode))

// 都道府県ごとの人口データ
const populationStateFamily = selectorFamily({
  key: 'population',
  get: (prefCode: number) => () => fetchPrefPopulation(prefCode),
})

// グラフ用データ
const graphDataState = selector({
  key: 'graphData',
  get: async ({ get }): Promise<GraphData> => {
    const prefectures = get(prefecturesState)
    const checkedPrefectures = prefectures.filter((pref) =>
      get(checkedStateFamily(pref.prefCode))
    )
    const populations = get(
      waitForAll(
        checkedPrefectures.map((pref) => populationStateFamily(pref.prefCode))
      )
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
  },
})

export const useGraphData = () => useRecoilValueLoadable(graphDataState)
