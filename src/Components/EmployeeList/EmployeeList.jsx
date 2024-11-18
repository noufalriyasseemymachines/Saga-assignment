import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import "./EmployeeList.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeRequest } from "../../Actions/EmployeeActions";

const EmployeeList = ({onEdit,onDelete,setDeleteModal,setEmployeeToDelete}) => {
    const dispatch=useDispatch()
    const { employees, loading, error } = useSelector(
    (state) => state.employeRed
  );

  useEffect(()=>{
    dispatch(fetchEmployeeRequest())
  },[dispatch])

//   const handleClick=(employee)=>{
//     setEmployeeToDelete(employee)
//     setDeleteModal(true)
//   }

  return (
    <div className="table-Container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Date of Join</th>
            <th>Experience</th>
            <th>Email Address</th>
            <th>Date of Birth</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => {
          const dobObject=new Date(emp.dob)
          const formattedDob=dobObject.toLocaleDateString('en-GB')
          const dojObject=new Date(emp.doj)
          const formattedDoj=dojObject.toLocaleDateString("en-GB")
            return (

              <tr key={emp.employeeId}>
                <td>{emp.fname}</td>
                <td>{emp.designation}</td>
                <td>{formattedDoj}</td>
                <td>{emp.experience}</td>
                <td>{emp.email}</td>
                <td>{formattedDob}</td>
                <td>{emp.phoneNumber}</td>
                <td>
                  <div className="action-buttons">
                    <Button onClick={()=>onEdit(emp)} value="Edit" className="edit-button"></Button>
                    {/* <Button onClick={()=>onDelete(emp)} value="Delete" className="delete-button"></Button> */}
                    <Button value="Delete" onClick={() => onDelete(emp)} className="delete-button"></Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
