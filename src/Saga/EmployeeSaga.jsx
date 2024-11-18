import {
  ADD_EMPLOYEE_FAILURE,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE_FAILURE,
  EDIT_EMPLOYEE_REQUEST,
  EDIT_EMPLOYEE_SUCCESS,
  FETCH_EMPLOYEE_FAILURE,
  FETCH_EMPLOYEE_REQUEST,
  FETCH_EMPLOYEE_SUCCESS,
} from "../Actions/EmployeeActions";
import api from "../Api/Api";
import { call, put, takeLatest } from "redux-saga/effects";

export const fetchEmployeeFunction = () => {
  const token = localStorage.getItem("token");
  return api.get("/employee/list", {
    headers: {
      Authorization: `${token}`,
    },
  });
};

export const addEmployeeFunction = (employeeData) => {
  const token = localStorage.getItem("token");
  return api.post("/employee/register", employeeData, {
    headers: {
      Authorization: `${token}`,
    },
  });
};

export const editEmployeeFunction = (employeData) => {
  const token = localStorage.getItem("token");
  return api.put("/employee/edit", employeData, {
    headers: {
      Authorization: `${token}`,
    },
  });
};

export const deleteEmployeeFunction = (employeeId) => {
  const token = localStorage.getItem("token");
  return api.delete("/employee/delete", {
    headers: {
      Authorization: `${token}`,
    },
    data: { employeeId },
  });
};

export const fetchEmployeeByIdFunction=(employeeId)=>{
    const token=localStorage.getItem("token");
    return api.get(`/employee/getEmployeeById?employeeId={employeeId}`,{
        headers:{
            Authorization:`${token}`
        }
    })
}

export function* fetchEmployeeSaga() {
  try {
    const response = yield call(fetchEmployeeFunction);
    if (response.data.data.list.length !== 0) {
      yield put({
        type: FETCH_EMPLOYEE_SUCCESS,
        payload: response.data.data.list,
      });
    } 
    else{
        throw new Error("Employee Not Found")
    }
  } catch (error) {
    yield put({ type: FETCH_EMPLOYEE_FAILURE, payload: error.message });
  }
}

export function* addEmployeeSaga(action) {
  try {
    const response = yield call(addEmployeeFunction, action.payload);
    if (response.data.success) {
      yield put({ type: ADD_EMPLOYEE_SUCCESS, payload:action.payload });
      yield put({ type: FETCH_EMPLOYEE_REQUEST });
    }
    else{
        throw new Error(response.data.message)
    }
  } catch (error) {
    let errorMessage="Some Error Occured"
    if(error.response){
        errorMessage=error.response.data.message
    }else if(error.message){
        errorMessage=error.message
    }
    yield put({ type: ADD_EMPLOYEE_FAILURE, payload: errorMessage });
  }
}

export function* editEmployeeSaga(action) {
  try {
    const response = yield call(editEmployeeFunction, action.payload);
    if (response.data.success){
        console.log(response.data)
      yield put({ type: EDIT_EMPLOYEE_SUCCESS, payload: action.payload });
    }
    else{
        throw new Error(response.data.message)
    }
  } catch (error) {
    let errorMessage="Some Error Occured";
    if(error.response){
        errorMessage=error.response.data.message
    }
    else if(error.message){
        errorMessage=error.message
        console.log(errorMessage)
    }
    yield put({ type: EDIT_EMPLOYEE_FAILURE, payload: errorMessage });
  }
}

export function* deleteEmployeeSaga(action) {
  try {
    const response = yield call(deleteEmployeeFunction, action.payload);
    if (response.data.success){
        console.log(response.data)
      yield put({ type: DELETE_EMPLOYEE_SUCCESS, payload:action.payload});
    }
    else{
        throw new Error(response.data.message)
    }
  } catch (error) {
    let errorMessage="Some Error Occured";
    if(error.response){
        errorMessage=error.response.data.message
    }
    else if(error.message){
        errorMessage=error.message
    }
    yield put({ type: DELETE_EMPLOYEE_FAILURE, payload: errorMessage });
  }
}



export function* employeeActionSaga() {
  yield takeLatest(FETCH_EMPLOYEE_REQUEST, fetchEmployeeSaga);
  yield takeLatest(ADD_EMPLOYEE_REQUEST, addEmployeeSaga);
  yield takeLatest(EDIT_EMPLOYEE_REQUEST, editEmployeeSaga);
  yield takeLatest(DELETE_EMPLOYEE_REQUEST, deleteEmployeeSaga);
}
