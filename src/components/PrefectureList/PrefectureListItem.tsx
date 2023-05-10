import React from 'react'

import { useChecked } from '~/states'
import type { Prefecture } from '~/types'

import { labelClass } from './PrefectureList.css'

type Props = {
  pref: Prefecture
}

export const PrefectureListItem = React.memo(function PrefectureListItem({
  pref,
}: Props) {
  const [checked, setChecked] = useChecked(pref.prefCode)
  const handleChange = () => setChecked((prev) => !prev)

  return (
    <label className={labelClass}>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      {pref.prefName}
    </label>
  )
})
