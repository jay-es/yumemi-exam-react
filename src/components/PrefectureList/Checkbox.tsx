import React, { useEffect } from 'react'
import { usePrefPopulation } from '~/hooks/api'
import { useSetPopulation } from '~/states/population'
import { useTogglePrefCode } from '~/states/prefCodes'
import { Prefecture } from '~/types'
import { labelClass } from './PrefectureList.css'

type CheckboxProps = {
  pref: Prefecture
  checked: boolean
}
export const Checkbox = React.memo(function Checkbox({
  pref,
  checked,
}: CheckboxProps) {
  const { data } = usePrefPopulation(pref.prefCode, checked)
  const setPopulation = useSetPopulation()
  const toggle = useTogglePrefCode()

  useEffect(() => {
    if (data) {
      setPopulation(pref, data)
    }
  }, [data, pref, setPopulation])

  return (
    <label className={labelClass}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => toggle(pref.prefCode)}
      />
      {pref.prefName}
    </label>
  )
})
