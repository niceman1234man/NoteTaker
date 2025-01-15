import React from 'react'
import Navnar from './Components/Navnar'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <>
    <Navnar/>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
    </Routes>
    </>
  )
}

export default App