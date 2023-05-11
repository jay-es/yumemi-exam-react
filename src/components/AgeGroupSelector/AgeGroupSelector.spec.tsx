import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil'
import { describe, expect, it } from 'vitest'

import { AgeGroupSelector } from './AgeGroupSelector'

describe('AgeGroupSelector', () => {
  it('初期値は「総人口」', () => {
    const renderResult = render(
      <RecoilRoot>
        <AgeGroupSelector />
      </RecoilRoot>
    )

    const select = renderResult.getByRole('combobox')
    expect(select).toBeInTheDocument()
    expect(select).toHaveValue('総人口')
  })

  it('「年少人口」に変更', async () => {
    const renderResult = render(
      <RecoilRoot>
        <AgeGroupSelector />
      </RecoilRoot>
    )

    const select = renderResult.getByRole('combobox')
    const user = userEvent.setup()

    await user.selectOptions(select, '年少人口')

    expect(select).toHaveValue('年少人口')
  })

  it('選択肢にない値には変更できない', () => {
    const renderResult = render(
      <RecoilRoot>
        <AgeGroupSelector />
      </RecoilRoot>
    )

    const select = renderResult.getByRole('combobox')
    const user = userEvent.setup()

    expect(() => user.selectOptions(select, '人口')).rejects.toThrowError()

    expect(select).toHaveValue('総人口')
  })
})
