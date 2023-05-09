import { atom, atomFamily, useRecoilState, useSetRecoilState } from 'recoil'
import type { Prefecture } from '~/types'

export const prefecturesState = atom<Prefecture[]>({
  key: 'prefectures',
})

export const useSetPrefectures = () => useSetRecoilState(prefecturesState)

const checkedStateFamily = atomFamily({
  key: 'checked',
  default: false,
})

export const useChecked = (prefCode: number) =>
  useRecoilState(checkedStateFamily(prefCode))
