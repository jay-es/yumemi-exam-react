import {
  atom,
  atomFamily,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import { fetchPrefPopulation } from '~/hooks/api'
import type { Prefecture } from '~/types'

// 都道府県データ
export const prefecturesState = atom<Prefecture[]>({
  key: 'prefectures',
})

export const useSetPrefectures = () => useSetRecoilState(prefecturesState)

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
  get: async ({ get }) => {
    const prefectures = get(prefecturesState)
    const checkedPrefectures = prefectures.filter((pref) =>
      get(checkedStateFamily(pref.prefCode))
    )
    const populations = (
      await Promise.all(
        checkedPrefectures.map((pref) =>
          get(populationStateFamily(pref.prefCode))
        )
      )
    ).filter((v): v is NonNullable<typeof v> => !!v)

    // 360 度を 2 周
    const PREF_RATIO = (360 / 47) * 2

    const labels = populations[0]?.map((p) => p.year)
    const datasets = checkedPrefectures.map((p, i) => ({
      label: p.prefName,
      data: populations[i]?.map((v) => v.value),
      borderColor: `hsl(${p.prefCode * PREF_RATIO}, 75%, 50%)`,
      backgroundColor: `hsl(${p.prefCode * PREF_RATIO}, 100%, 90%)`,
    }))

    return { labels, datasets }
  },
})

export const useGraphData = () => useRecoilValue(graphDataState)
