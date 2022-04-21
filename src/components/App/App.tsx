import React from 'react'
import { headerClass, mainClass } from './App.css'
import { Graph } from '~/components/Graph/Graph'
import { PrefectureList } from '~/components/PrefectureList'

export function App() {
  return (
    <div>
      <header className={headerClass}>都道府県別 総人口推移</header>
      <main className={mainClass}>
        <PrefectureList />
        <Graph />
      </main>
    </div>
  )
}
