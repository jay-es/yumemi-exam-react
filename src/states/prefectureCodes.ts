import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

const prefectureCodesState = atom<number[]>({
  key: 'prefectureCodes',
  default: [13],
})

export const usePrefectureCodes = () => useRecoilValue(prefectureCodesState)

export const togglePrefectureCode = () => {
  const prefectureCodes = usePrefectureCodes()
  const setState = useSetRecoilState(prefectureCodesState)

  return (prefCode: number) => {
    if (prefectureCodes.includes(prefCode)) {
      setState(prefectureCodes.filter((v) => v !== prefCode))
    } else {
      setState([...prefectureCodes, prefCode].sort())
    }
  }
}
