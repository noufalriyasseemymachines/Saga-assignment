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
  GET_EMPLOYEE_BY_ID_FAILURE,
  GET_EMPLOYEE_BY_ID_REQUEST,
  GET_EMPLOYEE_BY_ID_SUCCESS,
} from "../Actions/EmployeeActions";
import api from "../Api/Api";
import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

export const fetchEmployeeFunction = () => {
  const token = localStorage.getItem("token");
  return api.get("/employee/list", {
    headers: {
      Authorization: `${token}`,
    },
  });
};

export function* fetchEmployeeSaga() {
  try {
    const response = yield call(fetchEmployeeFunction);
    if (response.data.data.list.length !== 0) {
      yield put({
        type: FETCH_EMPLOYEE_SUCCESS,
        payload: response.data.data.list,
      });
    } else {
      throw new Error("Employee Not Found");
    }
  } catch (error) {
    yield put({ type: FETCH_EMPLOYEE_FAILURE, payload: error.message });
    toast.error(error.message);
  }
}

export const addEmployeeFunction = (employeeData) => {
  const token = localStorage.getItem("token");
  return api.post("/employee/register", employeeData, {
    headers: {
      Authorization: `${token}`,
    },
  });
};

export function* addEmployeeSaga(action) {
  try {
    const response = yield call(addEmployeeFunction, action.payload);
    if (response.data.success) {
      console.log("add if block", response.data.success);
      yield put({ type: ADD_EMPLOYEE_SUCCESS, payload: action.payload });
      yield put({ type: FETCH_EMPLOYEE_REQUEST });
      toast.success(response.data.message);
    } else {
      console.log("else try", response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    yield put({
      type: ADD_EMPLOYEE_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
    console.log(error.response.data.message);
  }
}

export const fetchEmployeeByIdFunction = (employeeId) => {
  const token = localStorage.getItem("token");
  return api.get(`/employee/getEmployeeById?employeeId=${employeeId}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
};

export function* fetchEmployeeByIdSaga(action) {
  try {
    const response = yield call(fetchEmployeeByIdFunction, action.payload);
    if (response.data.success) {
      console.log(response.data);
      console.log(response.data.data.employee);
      yield put({
        type: GET_EMPLOYEE_BY_ID_SUCCESS,
        payload: response.data.data.employee,
      });
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    yield put({ type: GET_EMPLOYEE_BY_ID_FAILURE, payload: error.message });
    toast.error(error.response.data.message);
  }
}

export const editEmployeeFunction = (employeData) => {
  const token = localStorage.getItem("token");
  return api.put("/employee/edit", employeData, {
    headers: {
      Authorization: `${token}`,
    },
  });
};

export function* editEmployeeSaga(action) {
  try {
    const response = yield call(editEmployeeFunction, action.payload);
    if (response.data.success) {
      yield put({ type: EDIT_EMPLOYEE_SUCCESS, payload: action.payload });
      yield put({ type: FETCH_EMPLOYEE_REQUEST });
      toast.success(response.data.message);
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    yield put({
      type: EDIT_EMPLOYEE_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
}

export const deleteEmployeeFunction = (employeeId) => {
  const token = localStorage.getItem("token");
  return api.delete("/employee/delete", {
    headers: {
      Authorization: `${token}`,
    },
    data: { employeeId },
  });
};

export function* deleteEmployeeSaga(action) {
  try {
    const response = yield call(deleteEmployeeFunction, action.payload);
    if (response.data.success) {
      console.log(response.data);
      yield put({ type: DELETE_EMPLOYEE_SUCCESS, payload: action.payload });
      toast.success(response.data.message);
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    yield put({
      type: DELETE_EMPLOYEE_FAILURE,
      payload: error.response.data.message,
    });
    toast.error(error.reponse.data.message);
  }
}

export function* employeeActionSaga() {
  yield takeLatest(FETCH_EMPLOYEE_REQUEST, fetchEmployeeSaga);
  yield takeLatest(ADD_EMPLOYEE_REQUEST, addEmployeeSaga);
  yield takeLatest(GET_EMPLOYEE_BY_ID_REQUEST, fetchEmployeeByIdSaga);
  yield takeLatest(EDIT_EMPLOYEE_REQUEST, editEmployeeSaga);
  yield takeLatest(DELETE_EMPLOYEE_REQUEST, deleteEmployeeSaga);
}
