import { useCallback } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { Prefecture, YearValue } from '../types'

type Population = Record<
  number,
  {
    prefCode: number
    prefName: string
    data: YearValue[]
  }
>

const populationState = atom<Population>({
  key: 'population',
  default: Object.create(null),
})

export const usePopulations = () => useRecoilValue(populationState)

export const useSetPopulation = () => {
  const setState = useSetRecoilState(populationState)

  return useCallback((pref: Prefecture, data: YearValue[]) => {
    setState((currVal) => ({
      ...currVal,
      [pref.prefCode]: {
        prefCode: pref.prefCode,
        prefName: pref.prefName,
        data,
      },
    }))
  }, [])
}
