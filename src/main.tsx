import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './components/App'

/* eslint-disable react-memo/require-usememo */
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
