import React, { useState } from 'react'
import { replace, useNavigate } from 'react-router-dom'
import EmployeeList from '../../Components/EmployeeList/EmployeeList'
import { useDispatch } from 'react-redux';
import { deleteEmployeeRequest, fetchEmployeeRequest } from '../../Actions/EmployeeActions';
import EmployeeForm from '../../Components/EmployeeForm/EmployeeForm';
import Button from '../../Components/Button/Button';
import './Dashbaord.css'
import DeleteModal from '../../Components/DeleteModal/DeleteModal';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [showModal,setShowModal]=useState(false)
  const [editEmployee,setEditEmployee]=useState(null)
  const [employeeToDelete,setEmployeeToDelete]=useState(null)
  const [deleteModal,setDeleteModal]=useState(false)

  // const handleDelete=(employee)=>{
  //   const {employeeId}=employee
  //   dispatch(deleteEmployeeRequest(employeeId))
  // }

  const onCancelDelete=()=>{
    setEmployeeToDelete(null)
    setDeleteModal(false)

  }

  const onDelete=(employee)=>{
    setEmployeeToDelete(employee)
    setDeleteModal(true)
  }

  const handleDelete=()=>{
    if (employeeToDelete.employeeId) {
      dispatch(deleteEmployeeRequest(employeeToDelete.employeeId));
    }

    setDeleteModal(false); 
    setEmployeeToDelete(null); 
  } 

    const handleEdit=(employee)=>{
      setShowModal(true)
      setEditEmployee(employee)
      console.log(employee)
    }
    const openModal=()=>{
      setShowModal(true)
      setEditEmployee(null)
    }

    const logoutFunction=()=>{
      localStorage.removeItem("token")
      localStorage.removeItem("isLoggedIn")
      navigate("/",{replace:true})
    }
    const searchResult=()=>{

    }

  return (
    <div className='dashboard-container'>
      <div className='dashboard-title'>
        <div className='dashboard-heading'>
          <h2 className='heading'>Employee Dashboard</h2>
        </div>
        <div className='dashboard-heading'>
          <div className='dashboard-button'>
            <Button className="modal-button" onClick={openModal} value="Add Employee" />
            <Button className="logout-button" onClick={logoutFunction} value="logout" />
          </div> 
        </div>
      </div>
      <div className="welcome-message">
        <p>Welcome to Employee Dashboard</p>
      </div>
      <div className='dashbaord-contents'>
        <div className='filter'>
          <input type='text' placeholder='search Here'/>
          <Button className="search-button" onClick={searchResult} value="Search"/>
        </div>
        <div className='employee-data'>
          <EmployeeList onEdit={handleEdit} onDelete={onDelete} setDeleteModal={setDeleteModal} setEmployeeToDelete={setEmployeeToDelete}/>
        </div>
      </div>
      <div className='modal-display'>
        {showModal && <EmployeeForm setShowModal={setShowModal} editEmployee={editEmployee} setEditEmployee={setEditEmployee} />}
      </div>
      <div className='delete-modal'>
        {deleteModal && <DeleteModal employeeToDelete={employeeToDelete} onConfirmDelete={handleDelete} onCancelDelete={onCancelDelete} />}
      </div>
    </div>
  );
}
export default Dashboard
    
