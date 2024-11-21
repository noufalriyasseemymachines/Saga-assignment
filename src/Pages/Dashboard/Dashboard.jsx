import React, { useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import EmployeeList from "../../Components/EmployeeList/EmployeeList";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployeeRequest,
  fetchEmployeeRequest,
  getEmployeeByIdRequest,
} from "../../Actions/EmployeeActions";
import EmployeeForm from "../../Components/EmployeeForm/EmployeeForm";
import Button from "../../Components/Button/Button";
import "./Dashbaord.css";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("");
  const {employees}=useSelector((state)=>state.employeRed)

  // const handleDelete=(employee)=>{
  //   const {employeeId}=employee
  //   dispatch(deleteEmployeeRequest(employeeId))
  // }

  const onCancelDelete = () => {
    setEmployeeToDelete(null);
    setDeleteModal(false);
  };

  const onDelete = (employee) => {
    setEmployeeToDelete(employee);
    setDeleteModal(true);
  };

  const handleDelete = () => {
    if (employeeToDelete.employeeId) {
      dispatch(deleteEmployeeRequest(employeeToDelete.employeeId));
      setDeleteModal(false)
      setEmployeeToDelete(null);
    }
    // setDeleteModal(false);
    // setEmployeeToDelete(null);
  };

  const handleEdit = (employee) => {
    dispatch(getEmployeeByIdRequest(employee.employeeId));
    setShowModal(true);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value === "") {
      setFilter("");
    }
  };

  const searchResult = () => {
    setFilter(searchInput);
  };

  const logoutFunction = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate("/", { replace: true });
    toast.success("User logged out successfully");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-title">
        <div className="dashboard-heading">
          <h2 className="heading">Employee Dashboard</h2>
        </div>
        <div className="dashboard-heading">
          <div className="dashboard-button">
            <Button
              className="modal-button"
              onClick={openModal}
              value="Add Employee"
            />
            <Button
              className="logout-button"
              onClick={logoutFunction}
              value="Logout"
            />
          </div>
        </div>
      </div>
      <div className="welcome-message">
        <p>Welcome to Employee Dashboard</p>
      </div>
      <div className="dashbaord-contents">
        <div className="filter">
          <input
            type="text"
            placeholder="Search for employee name,email or designation "
            value={searchInput}
            onChange={handleFilter}
          />
          <Button
            className="search-button"
            onClick={searchResult}
            value="Search"
          />
        </div>
        <div className="employee-data">
          { employees ? <EmployeeList
            onEdit={handleEdit}
            onDelete={onDelete}
            setDeleteModal={setDeleteModal}
            setEmployeeToDelete={setEmployeeToDelete}
            filter={filter}
          />:<p className="sorry-message">Sorry... No details found</p>}
          
        </div>
      </div>
      <div className="modal-display">
        {showModal && <EmployeeForm setShowModal={setShowModal} />}
      </div>
      <div className="delete-modal">
        {deleteModal && (
          <DeleteModal
            employeeToDelete={employeeToDelete}
            onConfirmDelete={handleDelete}
            onCancelDelete={onCancelDelete}
          />
        )}
      </div>
    </div>
  );
};
export default Dashboard;
