import React from 'react'

import { Graph } from '~/components/Graph'
import { PrefectureList } from '~/components/PrefectureList'

import { AgeGroupSelector } from '../AgeGroupSelector'
import { headerClass, mainClass } from './App.css'

export const App = React.memo(function App() {
  return (
    <div>
      <header className={headerClass}>都道府県別 人口推移</header>
      <main className={mainClass}>
        <AgeGroupSelector />
        <React.Suspense fallback={<div>Loading...</div>}>
          <PrefectureList />
        </React.Suspense>
        <Graph />
      </main>
    </div>
  )
})
