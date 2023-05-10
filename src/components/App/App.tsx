import React from 'react'

import { Graph } from '~/components/Graph/Graph'
import { PrefectureList } from '~/components/PrefectureList'

import { headerClass, mainClass } from './App.css'

export const App = React.memo(function App() {
  return (
    <div>
      <header className={headerClass}>都道府県別 総人口推移</header>
      <main className={mainClass}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <PrefectureList />
        </React.Suspense>
        <Graph />
      </main>
    </div>
  )
})
