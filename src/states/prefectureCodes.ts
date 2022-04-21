import { useCallback } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

const prefectureCodesState = atom<number[]>({
  key: 'prefectureCodes',
  default: [13, 23, 27],
})

export const usePrefectureCodes = () => useRecoilValue(prefectureCodesState)

export const togglePrefectureCode = () => {
  const setState = useSetRecoilState(prefectureCodesState)

  return useCallback((prefCode: number) => {
    setState((currVal) =>
      currVal.includes(prefCode)
        ? currVal.filter((v) => v !== prefCode)
        : [...currVal, prefCode].sort((a, b) => a - b)
    )
  }, [])
}
