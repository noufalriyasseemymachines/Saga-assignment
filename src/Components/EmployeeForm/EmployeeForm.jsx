import React, { useEffect, useState } from "react";
import "../Input/Input";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./EmployeeForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployeeRequest,
  editEmployeeRequest,
  resetEmployee,
} from "../../Actions/EmployeeActions";
import { toast } from "react-toastify";

const EmployeeForm = ({ setShowModal}) => {
  const { employe } = useSelector((state) => state.employeRed);
  const dispatch = useDispatch();
  const [formError, setFormError] = useState({});
  const [employee, setEmployee] = useState({
    employeeId: "",
    fname: "",
    lname: "",
    email: "",
    dob: "",
    doj: "",
    designation: "",
    experience: "",
    phoneNumber: "",
  });

  const NAME_REGEX_FIRST_NAME = /^[A-Za-z]{2,}$/;
  const NAME_REGEX_LAST_NAME = /^[A-Za-z]{1,}$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const DESIGNATION_REGEX = /^[A-Za-z\s]{2,}$/;
  const PHONE_NUMBER_REGEX = /^\d{10}$/;
  const EXPERIENCE_REGEX = /^[0-9]+(\.[0-9]{1,2})?$/;

  const validateFormDetails = () => {
    const newError = {};
    if (!employee.fname) {
      newError.fname = "Please enter first name";
    } else if (!NAME_REGEX_FIRST_NAME.test(employee.fname)) {
      newError.fname = "Invalid Name format";
    }

    if (!employee.lname) {
      newError.lname = "Please enter last name";
    } else if (!NAME_REGEX_LAST_NAME.test(employee.lname)) {
      newError.lname = "Invalid Name format";
    }

    if (!employee.email) {
      newError.email = "Please enter email";
    } else if (!EMAIL_REGEX.test(employee.email)) {
      newError.email = "Invalid Email format";
    }

    if (!employee.designation) {
      newError.designation = "Please enter designation";
    } else if (!DESIGNATION_REGEX.test(employee.designation)) {
      newError.designation = "Invalid Designation format";
    }

    if (!employee.experience) {
      newError.experience = "Please enter experience";
    } else if (!EXPERIENCE_REGEX.test(employee.experience)) {
      newError.experience = "Invalid Experience format";
    }

    if (!employee.phoneNumber) {
      newError.phoneNumber = "Please enter number";
    } else if (!PHONE_NUMBER_REGEX.test(employee.phoneNumber)) {
      newError.phoneNumber = "Invalid Phone Number format";
    }
    if(!employee.dob){
      newError.dob = "Please enter DOB";
    }
    else if(computeAge(employee.dob) < 18){
      newError.dob = "Must be 18 yr old";
    }

    if(!employee.doj){
      newError.doj = "Please enter DOJ"
    }
    else if(!computeDate(employee.doj)){
      newError.doj = "Invalid Date format"
    }

    setFormError(newError);
    return Object.keys(newError).length === 0;
  };


  useEffect(() => {
    if (employe) {
      setEmployee({
        employeeId: employe.employeeId,
        fname: employe.fname,
        lname: employe.lname,
        email: employe.email,
        dob: employe.dob ? employe.dob.split("T")[0] : "",
        doj: employe.doj ? employe.doj.split("T")[0] : "",
        designation: employe.designation,
        experience: employe.experience,
        phoneNumber: employe.phoneNumber,
      });
    } else {
      setEmployee({
        employeeId: "",
        fname: "",
        lname: "",
        email: "",
        dob: "",
        doj: "",
        designation: "",
        experience: "",
        phoneNumber: "",
      });
    }
  }, [employe]);

  const computeAge=(date)=>{
    let birthDate=new Date(date)
    const today=new Date()
    let age=today.getFullYear()-birthDate.getFullYear()
    const monthDifference=today.getMonth()-birthDate.getMonth()

    if(monthDifference<0 || monthDifference===0 && today.getDate() < birthDate.getDate()){
      age--
    }
    return age
  }


  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));

    if (name === "fname") {
      if(!value){
        setFormError((prev) => ({ ...prev, fname: "Please enter first name"}))
      }
      else if (!NAME_REGEX_FIRST_NAME.test(value)) {
        setFormError((prev) => ({
          ...prev,
          fname: "Invalid Name Format",
        }));
        
      } 
      else {
        setFormError((prev) => ({ ...prev, fname: "" }));
      }
    } 
    else if (name === "lname") {
      if(!value){
        setFormError((prev) => ({ ...prev, lname: "Please enter last name"}))
      }
      else if (!NAME_REGEX_LAST_NAME.test(value)) {
        setFormError((prev) => ({ ...prev, lname: "Invalid Name Format" }));
      } 
      else {
        setFormError((prev) => ({ ...prev, lname: "" }));
      }
    } 
    else if (name === "email") {
      if(!value){
        setFormError((prev) => ({ ...prev, email: "Please enter email"}))
      }
      else if (!EMAIL_REGEX.test(value)) {
        setFormError((prev) => ({ ...prev, email: "Invalid Email format" }));
      } 
      else {
        setFormError((prev) => ({ ...prev, email: "" }));
      }
    } 
    else if (name === "designation") {
      if(!value){
        setFormError((prev) => ({ ...prev, designation: "Please enter designation"}))
      }
      else if (!DESIGNATION_REGEX.test(value)) {
        setFormError((prev) => ({
          ...prev,
          designation: "Invalid Designation format",
        }));
      } 
      else {
        setFormError((prev) => ({ ...prev, designation: "" }));
      }
    } 
    else if (name === "experience") {
      if(!value){
        setFormError((prev) => ({ ...prev, experience: "Please enter experience"}))
      }
      else if (!EXPERIENCE_REGEX.test(value)) {
        setFormError((prev) => ({
          ...prev,
          experience: "Invalid Experience format",
        }));
      } 
      else {
        setFormError((prev) => ({ ...prev, experience: "" }));
      }
    } 
    else if (name === "phoneNumber") {
      if(!value){
        setFormError((prev) => ({ ...prev, phoneNumber: "Please enter phone number"}))
      }
      else if (!PHONE_NUMBER_REGEX.test(value)) {
        setFormError((prev) => ({
          ...prev,
          phoneNumber: "Invalid Phone Number format",
        }));
      } 
      else {
        setFormError((prev) => ({ ...prev, phoneNumber: "" }));
      }
    }
    else if(name==="dob"){
      const age=computeAge(value)
      if(!value){
        setFormError((prev) => ({ ...prev, dob: "Please enter DOB"}))
      }
      else if(age<18){
        setFormError((prev) => ({...prev,dob:"Must be 18yr old"}))
      }
      else{
        setFormError((prev) => ({ ...prev, dob: "" }));
      }
    }
    else if(name==="doj"){
      const date=computeDate(value)
        if(!value){
          setFormError((prev) => ({ ...prev, doj: "Please enter DOJ"}))
        }
        else if(!date){
          setFormError((prev) => ({ ...prev, doj: "Invalid Date format"}))
        }
        else{
          setFormError((prev) => ({ ...prev, doj: "" }));
        }
 
    }
  };

  const computeDate=(date)=>{
    const today = new Date();
    const enteredDate=new Date(date)
      return today>=enteredDate;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFormDetails()) {
      if (employee.employeeId) {
        dispatch(editEmployeeRequest(employee));
        dispatch(resetEmployee())
      } else {
        const { employeeId, ...newEmployee } = employee;
        dispatch(addEmployeeRequest(newEmployee));
      }
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    dispatch(resetEmployee());
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{employee.employeeId ? "EDIT" : "REGISTER"}</h2>
        </div>
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-box">
              <Input
                type="text"
                label="First Name"
                name="fname"
                className="full-width"
                value={employee.fname}
                onChange={handleChange}
              />
              <p className={`form-error ${formError.fname ? "visible" : ""}`}>
                {formError.fname}
              </p>
            </div>
            <div className="input-box">
              <Input
                type="text"
                label="Last Name"
                name="lname"
                className="full-width"
                value={employee.lname}
                onChange={handleChange}
              />
              <p className={`form-error ${formError.lname ? "visible" : ""}`}>
                {formError.lname}
              </p>
            </div>
          </div>
          <div className="form-row">
            <div className="input-box">
              <Input
                type="email"
                label="Email address"
                name="email"
                className="full-width"
                value={employee.email}
                onChange={handleChange}
              />
              <p className={`form-error ${formError.email ? "visible" : ""}`}>
                {formError.email}
              </p>
            </div>
            <div className="half">
              <div className="input-box half-width">
                <Input
                  type="date"
                  label="Date of birth"
                  name="dob"
                  className="half-width"
                  value={employee.dob}
                  onChange={handleChange}
                />
               <p className={`form-error ${formError.dob ? "visible" : ""}`}>
                {formError.dob}
              </p>
              </div>
              <div className="input-box half-width">
                <Input
                  type="date"
                  label="Date of join"
                  name="doj"
                  className="half-width"
                  value={employee.doj}
                  onChange={handleChange}
                />
                <p className={`form-error ${formError.doj ? "visible" : ""}`}>
                {formError.doj}
              </p>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="input-box">
              <Input
                type="text"
                label="Designation"
                name="designation"
                full-width
                value={employee.designation}
                onChange={handleChange}
              />
              <p
                className={`form-error ${
                  formError.designation ? "visible" : ""
                }`}
              >
                {formError.designation}
              </p>
            </div>
            <div className="half">
              <div className="input-box half-width">
                <Input
                  type="number"
                  label="Experience (in yr)"
                  name="experience"
                  className="half-width"
                  value={employee.experience}
                  onChange={handleChange}
                  min="0"
                  step="1"
                />
                <p
                  className={`form-error ${
                    formError.experience ? "visible" : ""
                  }`}
                >
                  {formError.experience}
                </p>
              </div>
              <div className="input-box half-width">
                <Input
                  type="tel"
                  label="Phone"
                  name="phoneNumber"
                  className="half-width"
                  value={employee.phoneNumber}
                  onChange={handleChange}
                />
                <p
                  className={`form-error ${
                    formError.phoneNumber ? "visible" : ""
                  }`}
                >
                  {formError.phoneNumber}
                </p>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-button">
              <Button
                type="submit"
                className="add-button"
                value={employee.employeeId ? "Update" : "Register"}
              />
              <Button
                type="button"
                className="cancel-button"
                value="Cancel"
                onClick={handleCancel}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EmployeeForm;
