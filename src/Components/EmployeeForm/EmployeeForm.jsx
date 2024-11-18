import React, { useEffect, useState } from "react";
import "../Input/Input";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./EmployeeForm.css";
import { useDispatch } from "react-redux";
import {
  addEmployeeRequest,
  editEmployeeRequest
} from "../../Actions/EmployeeActions";

const EmployeeForm = ({ setShowModal,editEmployee,setEditEmployee }) => {
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState({
    employeeId:"",
    fname: "",
    lname: "",
    email: "",
    dob: "",
    doj: "",
    designation: "",
    experience: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (editEmployee) {
      setEmployee({
        employeeId:editEmployee.employeeId,
        fname:editEmployee.fname,
        lname:editEmployee.lname,
        email:editEmployee.email,
        dob: editEmployee.dob.split("T")[0], 
        doj: editEmployee.doj.split("T")[0],
        designation:editEmployee.designation,
        experience:editEmployee.experience,
        phoneNumber:editEmployee.phoneNumber
      });
    }
    else {
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
    
  }, [editEmployee]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(employee.employeeId){
      dispatch(editEmployeeRequest(employee))
    }
    else{
      const {employeeId,...newEmployee}=employee;
      dispatch(addEmployeeRequest(newEmployee))
    }

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
    setShowModal(false);
    setEditEmployee(null)
  };


  const handleCancel = () => {
    setShowModal(false);
    setEditEmployee(null)
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{employee.employeeId ? "EDIT":"REGISTER"}</h2>
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
              <p className="form-error">Please enter first name</p>
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
              <p className="form-error">Please enter last name</p>
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
              <p className="form-error">Please enter email address</p>
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
                <p className="form-error">Please enter DOB</p>
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
                <p className="form-error">Please enter join date</p>
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
              <p className="form-error">Please enter designation</p>
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
                />
                <p className="form-error">Please enter exp in yr </p>
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
                <p className="form-error">Please enter Phone</p>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-button">
              <Button type="submit" className="add-button" value={employee.employeeId ? "Update":"Register"} />
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
