import React, { useEffect, useState } from 'react'
import './Loginpage.css'
import Signup from '../../Components/Signup/Signup'
import Information from '../../Components/Information/Information'
import LoginComponent from '../../Components/Login/LoginComponent'
import { useNavigate } from 'react-router-dom'

const Loginpage = () => {
  const [olduser,setOlduser]=useState(false)
  const navigate=useNavigate()
  useEffect(()=>{
    const token=localStorage.getItem("token")
    if(token){
      navigate("/dashboard",{replace:true})
    }
  },[navigate])

  
  return (
    <div className='logincontainer-outer'>
      <div className='login-container-inner-left'>
          <Information olduser={olduser} setOlduser={setOlduser}></Information>
      </div>
      <div className='login-container-inner-right'>
          {olduser ?<LoginComponent></LoginComponent>:<Signup></Signup>}
      </div>
    </div>
  )
}

export default Loginpage
