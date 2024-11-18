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



export const registerFunction = (userData) => {
  return api.post("/users/signup", userData);
};

export const loginFunction = (loginData) => {
  return api.post("/users/login", loginData);
};

function* registerSaga(action) {
  const {navigate}=action
  try {
    const response = yield call(registerFunction, action.payload);
    console.log(response.data.data.token)
    if (response.data.data.token) {
      localStorage.setItem("token",response.data.data.token)
      localStorage.setItem("isLoggedIn",true)
      navigate('/dashboard',{replace:true})
      yield put({ type: REGISTER_SUCCESS, payload: response.data.data.token });
    }
  } catch (error) {
    console.log(error)
    if (error.response) {
        yield put({ type: REGISTER_FAILURE, payload: error.response.data.message });
      }
       else {
      yield put({ type: REGISTER_FAILURE, payload: error.message });
    }
  }
}


function* loginSaga(action) {
  const {navigate}=action
  try {
    const response = yield call(loginFunction, action.payload);
    if (response.data.data.token) {
      localStorage.setItem("token",response.data.data.token)
      localStorage.setItem("isLoggedIn",true)
      navigate("/dashboard",{replace:true});
      yield put({ type:LOGIN_SUCCESS, payload: response.data.data.token });
    }
    
  } catch (error) {
    console.log(error)
    if(error.response){
        yield put({type:LOGIN_FAILURE,payload:error.response.data.message})
      }
    else{
      yield put({ type: LOGIN_FAILURE, payload: error.message });
    }
  }
}

export function* authSaga() {
  yield takeLatest(REGISTER_REQUEST,registerSaga)
  yield takeLatest(LOGIN_REQUEST,loginSaga)
}
