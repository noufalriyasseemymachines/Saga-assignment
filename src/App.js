import React from 'react'
import Loginpage from './Pages/Loginpage/Loginpage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Logout from './Pages/Logout/Logout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Loginpage/>} />
        <Route path='/dashboard' element={<ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>} />
        <Route path='/logout' element={<Logout/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

