import React from 'react'
import Rizoheader from './Components/Rizoheader'
import { Outlet } from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Rizoheader/>
      <Outlet/>
    </div>
  )
}

export default App