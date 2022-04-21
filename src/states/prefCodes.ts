import { useCallback } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

const prefCodesState = atom<number[]>({
  key: 'prefCodes',
  default: [13, 23, 27],
})

export const usePrefCodes = () => useRecoilValue(prefCodesState)

export const togglePrefCode = () => {
  const setState = useSetRecoilState(prefCodesState)

  return useCallback((prefCode: number) => {
    setState((currVal) =>
      currVal.includes(prefCode)
        ? currVal.filter((v) => v !== prefCode)
        : [...currVal, prefCode].sort((a, b) => a - b)
    )
  }, [])
}
