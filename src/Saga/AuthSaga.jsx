import { replace } from "react-router-dom";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../Actions/AuthActions";
import api from "../Api/Api";
import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

export const registerFunction = (userData) => {
  return api.post("/users/signup", userData);
};

function* registerSaga(action) {
  const { navigate } = action;
  try {
    const response = yield call(registerFunction, action.payload);
    console.log(response.data.data.token);
    if (response.data.data.token) {
      console.log(response.data)
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("isLoggedIn", true);
      navigate("/dashboard", { replace: true });
      yield put({ type: REGISTER_SUCCESS, payload: response.data.data.token });
      toast.success(`${response.data.data.message}`);
    }
    // else{
    //   console.log(response.data.data.message)
    //   throw new Error (response.data.data.message)
    // }
  } 
  catch (error) {
      console.log("catch if", error.response.data.message)
      console.log("catch if response",error.response.data)
      yield put({
        type: REGISTER_FAILURE,
        payload: error.response.data.message,
      });
      toast.error(error.response.data.message);
    } 
  }

export const loginFunction = (loginData) => {
  return api.post("/users/login", loginData);
};

function* loginSaga(action) {
  const { navigate } = action;
  try {
    const response = yield call(loginFunction, action.payload);
    if (response.data.data.token){
      console.log("token",response.data.data.token)
      console.log("response data",response.data.data)
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("isLoggedIn", true);
      navigate("/dashboard", { replace: true });
      yield put({ type: LOGIN_SUCCESS, payload: response.data.data.token });
      toast.success(`${response.data.data.message}`);
    }
    // else{
    //   console.log("try else",response.data.data.message)
    //   throw new Error(response.data.data.message)
    // }
  } catch (error) {
    console.log(error);
      console.log("catch if login",error.response.data.message)
      console.log("catch if response",error.response.data)
      yield put({ type: LOGIN_FAILURE, payload: error.response.data.message });
      toast.error(error.response.data.message);
    } 
  }

export function* authSaga() {
  yield takeLatest(REGISTER_REQUEST, registerSaga);
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
