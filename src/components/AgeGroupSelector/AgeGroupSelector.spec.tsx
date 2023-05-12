import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil'
import { describe, expect, it } from 'vitest'

import { AgeGroupSelector } from './AgeGroupSelector'

describe('AgeGroupSelector', () => {
  it('初期値は「総人口」', () => {
    render(
      <RecoilRoot>
        <AgeGroupSelector />
      </RecoilRoot>
    )

    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    expect(select).toHaveValue('総人口')
  })

  it('「年少人口」に変更', async () => {
    render(
      <RecoilRoot>
        <AgeGroupSelector />
      </RecoilRoot>
    )

    const select = screen.getByRole('combobox')
    const user = userEvent.setup()

    await user.selectOptions(select, '年少人口')

    expect(select).toHaveValue('年少人口')
  })

  it('選択肢にない値には変更できない', () => {
    render(
      <RecoilRoot>
        <AgeGroupSelector />
      </RecoilRoot>
    )

    const select = screen.getByRole('combobox')
    const user = userEvent.setup()

    expect(() => user.selectOptions(select, '人口')).rejects.toThrowError()

    expect(select).toHaveValue('総人口')
  })
})
