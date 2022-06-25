import { useCallback } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { Prefecture, YearValue } from '~/types'

type Population = Map<
  number,
  {
    prefCode: number
    prefName: string
    data: YearValue[]
  }
>

const populationState = atom<Population>({
  key: 'population',
  default: new Map(),
})

export const usePopulation = () => useRecoilValue(populationState)

export const useSetPopulation = () => {
  const setState = useSetRecoilState(populationState)

  return useCallback(
    (pref: Prefecture, data: YearValue[]) => {
      setState((currVal) => {
        const newVal = {
          prefCode: pref.prefCode,
          prefName: pref.prefName,
          data,
        }

        return new Map(currVal.set(pref.prefCode, newVal))
      })
    },
    [setState]
  )
}
