import React from 'react'
import { headerClass, mainClass } from './App.css'
import { Graph } from './Graph'
import { PrefectureList } from './PrefectureList'

function App() {
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

export default App
