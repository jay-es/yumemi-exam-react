import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { PrefectureListItem } from './PrefectureListItem'

describe('PrefectureListItem', () => {
  it('都道府県名が表示される', () => {
    render(<PrefectureListItem pref={{ prefCode: 1, prefName: '北海道' }} />)

    expect(screen.getByRole('checkbox', { name: '北海道' })).toBeInTheDocument()
  })

  it('最初はチェックが入っていない。クリックでチェックされる', async () => {
    render(<PrefectureListItem pref={{ prefCode: 1, prefName: '北海道' }} />)

    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).not.toBeChecked()

    const user = userEvent.setup()
    await user.click(checkbox)

    expect(checkbox).toBeChecked()
  })
})
