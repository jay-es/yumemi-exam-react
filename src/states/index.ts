import { atom, useSetRecoilState } from 'recoil'
import type { Prefecture } from '~/types'

export const prefecturesState = atom<Prefecture[]>({
  key: 'prefectures',
})

export const useSetPrefectures = () => useSetRecoilState(prefecturesState)
