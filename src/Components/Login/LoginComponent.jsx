import React, { useEffect, useState } from "react";
import "./LoginComponent.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearLogError, loginRequest } from "../../Actions/AuthActions";
import "./LoginComponent.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginComponent = () => {
  const [loginUser, setLoginUser] = useState({ email: "", password: "" });
  const { logloading, logError, token } = useSelector((state) => state.authRed);
  const [loginError, setLoginError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


  useEffect(() => {
    if (logError) {
      const timer = setTimeout(() => {
        dispatch(clearLogError());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [logError]);

  const validateLoginDetails = () => {
    let newErrors = {};

    if (!loginUser.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(loginUser.email)) {
      newErrors.email = "Invalid Email";
    }

    if (!loginUser.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(loginUser.password)) {
      newErrors.password = "Invalid Pssword Format";
    }

    setLoginError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginUser((prevState) => ({ ...prevState, [name]: value }));

    if (name === "email") {
      if (!emailRegex.test(value)) {
        setLoginError((prevState) => ({
          ...prevState,
          email: "Invalid email format",
        }));
      } else {
        setLoginError((prevState) => ({ ...prevState, email: "" }));
      }
    } else if (name === "password") {
      if (!passwordRegex.test(value)) {
        setLoginError((prevState) => ({
          ...prevState,
          password: "Invalid password format",
        }));
      } else {
        setLoginError((prevState) => ({ ...prevState, password: "" }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateLoginDetails()) {
      dispatch(loginRequest(loginUser, navigate));
      setLoginUser({ email: "", password: "" });
    }
  };



  return (
    <div className="container">
      <form className="login-container" onSubmit={handleSubmit}>
        <div className="login-text">
          <h2 className="login-heading">LOGIN</h2>
        </div>
        <p className={`login-error ${logError ? "visible" : ""}`}>{logError}</p>
        <div className="email-container">
          <Input
            type="email"
            placeholder="Enter Your Email"
            label="Your Email"
            onChange={handleChange}
            value={loginUser.email}
            name="email"
          ></Input>
          <p className={`login-error ${loginError.email ? "visible" : ""}`}>
            {loginError.email}
          </p>
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
          <p className={`login-error ${loginError.password ? "visible" : " "}`}>
            {loginError.password}
          </p>
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
