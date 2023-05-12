import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil'
import { describe, expect, it } from 'vitest'

import { PrefectureListItem } from './PrefectureListItem'

describe('PrefectureListItem', () => {
  it('都道府県名が表示される', () => {
    render(
      <RecoilRoot>
        <PrefectureListItem pref={{ prefCode: 1, prefName: '北海道' }} />
      </RecoilRoot>
    )

    expect(screen.getByText('北海道')).toBeInTheDocument()
  })

  it('最初はチェックが入っていない。クリックでチェックされる', async () => {
    render(
      <RecoilRoot>
        <PrefectureListItem pref={{ prefCode: 1, prefName: '北海道' }} />
      </RecoilRoot>
    )

    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).not.toBeChecked()

    const user = userEvent.setup()
    await user.click(checkbox)

    expect(checkbox).toBeChecked()
  })
})
