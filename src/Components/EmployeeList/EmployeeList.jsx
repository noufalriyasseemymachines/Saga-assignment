import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import "./EmployeeList.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeRequest } from "../../Actions/EmployeeActions";
import { toast } from "react-toastify";

const EmployeeList = ({
  onEdit,
  onDelete,
  setDeleteModal,
  setEmployeeToDelete,
  filter,
}) => {
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector(
    (state) => state.employeRed
  );

  useEffect(() => {
    dispatch(fetchEmployeeRequest());
  }, [dispatch]);

  //   const handleClick=(employee)=>{
  //     setEmployeeToDelete(employee)
  //     setDeleteModal(true)
  //   }
  const filteredEmployee = filter
    ? employees.filter((emp) => {
        const filterSmallCase = filter.toLowerCase();
        return (
          emp.fname.toLowerCase().includes(filterSmallCase) ||
          emp.lname.toLowerCase().includes(filterSmallCase) ||
          emp.email.toLowerCase().includes(filterSmallCase) ||
          emp.designation.toLowerCase().includes(filterSmallCase)
        );
      })
    : employees;

  const employeeToDisplay =
    filteredEmployee.length > 0 ? filteredEmployee : employees;

  useEffect(() => {
    if (filter && filteredEmployee.length === 0) {
      toast.info("No Search Result Found");
    } else if (filter && filteredEmployee.length > 0) {
      toast.success("Employees Filtered Succesfully");
    }
  }, [filter]);

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
          {employeeToDisplay.map((emp) => {
            const dobObject = new Date(emp.dob);
            const formattedDob = dobObject.toLocaleDateString("en-GB");
            const dojObject = new Date(emp.doj);
            const formattedDoj = dojObject.toLocaleDateString("en-GB");
            return (
              <tr key={emp.employeeId}>
                <td>
                  {emp.fname} {emp.lname}
                </td>
                <td>{emp.designation}</td>
                <td>{formattedDoj}</td>
                <td>{emp.experience}</td>
                <td>{emp.email}</td>
                <td>{formattedDob}</td>
                <td>{emp.phoneNumber}</td>
                <td>
                  <div className="action-buttons">
                    <p onClick={() => onEdit(emp)}>Edit</p>
                    <p onClick={() => onDelete(emp)}>Delete</p>
                    {/* <Button onClick={()=>onEdit(emp)} value="Edit" className="edit-button"></Button> */}
                    {/* <Button onClick={()=>onDelete(emp)} value="Delete" className="delete-button"></Button> */}
                    {/* <Button value="Delete" onClick={() => onDelete(emp)} className="delete-button"></Button> */}
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
