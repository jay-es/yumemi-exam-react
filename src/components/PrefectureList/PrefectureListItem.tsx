import React, { useCallback, useEffect } from 'react'
import { usePrefPopulation } from '~/hooks/api'
import { useSetPopulation } from '~/states/population'
import { useTogglePrefCode } from '~/states/prefCodes'
import { Prefecture } from '~/types'
import { labelClass } from './PrefectureList.css'

type Props = {
  pref: Prefecture
  checked: boolean
}

export const PrefectureListItem = React.memo(function PrefectureListItem({
  pref,
  checked,
}: Props) {
  const { data } = usePrefPopulation(pref.prefCode, checked)
  const setPopulation = useSetPopulation()
  const toggle = useTogglePrefCode()
  const handleChange = useCallback(() => toggle(pref.prefCode), [pref, toggle])

  useEffect(() => {
    if (data) {
      setPopulation(pref, data)
    }
  }, [data, pref, setPopulation])

  return (
    <label className={labelClass}>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      {pref.prefName}
    </label>
  )
})
