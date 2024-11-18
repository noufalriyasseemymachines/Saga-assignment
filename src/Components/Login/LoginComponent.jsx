import React, { useState } from "react";
import "./LoginComponent.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../Actions/AuthActions";
import './LoginComponent.css'
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {

  const [loginUser,setLoginUser]=useState({email:"",password:""})
  const {loading,logError,token}=useSelector((state)=>state.authRed)
  const [loginError,setLoginError]=useState({})
  const dispatch=useDispatch()
const navigate=useNavigate()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateLoginDetails=()=>{
    let newErrors={};

    if(!loginUser.email){
      newErrors.email="Email is required"
    }
    else if(!emailRegex.test(loginUser.email)){
      newErrors.email="Invalid Email"
    }

    if(!loginUser.password){
      newErrors.password="Password is required"
    }

    setLoginError(newErrors);
    return Object.keys(newErrors).length === 0;
    }

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setLoginUser((prevState)=>({...prevState,[name]:value}))
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(validateLoginDetails()){
      dispatch(loginRequest(loginUser,navigate))
      setLoginUser({email:"",password:""})
    }
  }
  return (
    <div className="container">
      <form className="login-container" onSubmit={handleSubmit}>
        <div className="login-text">
          <h2 className="login-heading">LOGIN</h2>
        </div>
        <p className={`login-error ${logError? "visible" :""}`}>{logError}</p>
        <div className="email-container">
          <Input
            type="email"
            placeholder="Enter Your Email"
            label="Your Email"
            onChange={handleChange}
            value={loginUser.email}
            name="email"
          ></Input>
          <p className={`login-error ${loginError.email ? "visible":""}`}>{loginError.email}</p>
        </div>
        <div className="input-div">
          <Input
            type="password"
            placeholder="Enter Your Password"
            label="Password"
            onChange={handleChange}
            value={loginUser.password}
            name="password"
          ></Input>
          <p className={`login-error ${loginError.password? "visible" :" "}`}>{loginError.password}</p>
        </div>
        <div className="button-signup">
          <Button
            type="submit"
            className="signup-button"
            value="Login"
          ></Button>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
