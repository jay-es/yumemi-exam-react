import 'cross-fetch/polyfill'

import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { PrefectureList } from './PrefectureList'

describe('PrefectureList', async () => {
  const prefectures = [...Array(47)].map((_, i) => ({ prefCode: i }))
  const server = setupServer(
    rest.get(
      'https://opendata.resas-portal.go.jp/api/v1/prefectures',
      (req, res, ctx) => res(ctx.json({ result: prefectures }))
    )
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('リストが表示される', async () => {
    render(
      <RecoilRoot>
        <React.Suspense>
          <PrefectureList />
        </React.Suspense>
      </RecoilRoot>
    )

    expect(await screen.findByRole('list')).toBeInTheDocument()
    expect(screen.queryAllByRole('listitem')).toHaveLength(47 * 2)
  })
})
