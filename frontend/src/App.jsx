import React from 'react'
import Navnar from './Components/Navnar'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AddNote from './Components/AddNote'


function App() {
  return (
    <>
  
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/add' element={<AddNote/>}/>
    </Routes>
    </>
  )
}

export default App