import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import "../Signup/Signup.css";
import Input from "../Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { clearRegisterError, registerRequest } from "../../Actions/AuthActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [confirmpass, setConfirmpass] = useState("");
  const dispatch = useDispatch();
  const {regloading, regError } = useSelector((state) => state.authRed);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


  useEffect(() => {
    if (regError) {
      const timer = setTimeout(() => {
        dispatch(clearRegisterError());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [regError]);

  const validateFormDetails = () => {
    const newErrors = {};
    let validPassword = true;

    if (!user.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(user.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!user.password) {
      newErrors.password = "Password is required";
      validPassword = false;
    } else if (!passwordRegex.test(user.password)) {
      newErrors.password = "Password Error";
      validPassword = false;
    }
    if (validPassword) {
      if (!confirmpass) {
        newErrors.confirmPassword = "Password Required";
      } else if (user.password !== confirmpass) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
    if (name === "email") {
      if (!emailRegex.test(value)) {
        setErrors((prevState) => ({
          ...prevState,
          email: "Invalid email format",
        }));
      } else {
        setErrors((prevState) => ({ ...prevState, email: "" }));
      }
    } else if (name === "password") {
      if (!passwordRegex.test(value)) {
        setErrors((prevState) => ({
          ...prevState,
          password: "Invalid Password format",
        }));
      } else {
        setErrors((prevState) => ({ ...prevState, password: "" }));
      }
    }
  };

  const handleChange = (e) => {
    setConfirmpass(e.target.value);
    if (e.target.value === user.password) {
      setErrors((prevState) => ({ ...prevState, confirmPassword: "" }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        confirmPassword: "Passwords do not match",
      }));
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFormDetails()) {
      dispatch(registerRequest(user, navigate));
      setUser({ email: "", password: "" });
      setConfirmpass("");
    }
  };


  return (
    <div className="signup-container">
      <form className="register-container" onSubmit={handleSubmit}>
        <div className="register-text">
          <h2 className="register-heading">REGISTER</h2>
        </div>
        <p className={`error-message ${regError ? "visible" : ""}`}>
          {regError}
        </p>
        <div className="email-container">
          <Input
            type="email"
            placeholder="Enter Your Email"
            label="Your Email"
            value={user.email}
            onChange={handleUserChange}
            name="email"
          ></Input>
          <p className={`error-message ${errors.email ? "visible" : ""}`}>
            {errors.email}
          </p>
        </div>
        <div className="password-container">
          <div className="input-div">
            <Input
              type="password"
              placeholder="Enter Your Password"
              label="Password"
              value={user.password}
              onChange={handleUserChange}
              name="password"
            ></Input>
            <p className={`error-message ${errors.password ? "visible" : ""}`}>
              {errors.password}
            </p>
          </div>
          <div className="input-div">
            <Input
              type="password"
              placeholder="Confirm Password"
              label="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              value={confirmpass}
            ></Input>

            <p
              className={`error-message ${
                errors.confirmPassword ? "visible" : ""
              }`}
            >
              {errors.confirmPassword}
            </p>
          </div>
        </div>
        <div className="button-signup">
          <Button
            type="submit"
            className="signup-button"
            value="Register"
          ></Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
