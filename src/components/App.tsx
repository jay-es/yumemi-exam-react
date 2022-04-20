import React from 'react'
import { headerClass, mainClass } from './App.css'
import { Prefectures } from './Prefectures'

function App() {
  return (
    <div>
      <header className={headerClass}>都道府県別 総人口推移</header>
      <main className={mainClass}>
        <Prefectures />
      </main>
    </div>
  )
}

export default App
