import React from 'react'
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
  const toggle = useTogglePrefCode()

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
