import React from 'react'
import { Outlet } from 'react-router-dom'
import Rizoheader from './Components/Rizoheader'

const App = () => {
  return (
    <div>
      <Rizoheader />
      <Outlet />
    </div>
  )
}

export default App