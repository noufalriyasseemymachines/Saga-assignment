import React from 'react'
import Loginpage from './Pages/Loginpage/Loginpage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Logout from './Pages/Logout/Logout'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer position='bottom-right' autoClose={1200}></ToastContainer>
      <Routes>
        <Route path='/' element={<Loginpage/>} />
        <Route path='/dashboard' element={<ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>} />
        {/* <Route path='/logout' element={<Logout/>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App

