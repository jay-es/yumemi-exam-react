import React, { ComponentProps, PropsWithChildren } from 'react'
import { labelClass } from './PrefectureList.css'

type Props = PropsWithChildren<ComponentProps<'input'>>

export const Checkbox = React.memo(function CheckboxTemplate({
  checked,
  children,
  onChange,
}: Props) {
  return (
    <label className={labelClass}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {children}
    </label>
  )
})
