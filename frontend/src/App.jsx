import React from 'react'
import Navnar from './Components/Navnar'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AddNote from './Components/AddNote'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
  
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dash' element={<Dashboard/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/add' element={<AddNote/>}/>
    </Routes>
    <ToastContainer/>
    </>
  )
}

export default App