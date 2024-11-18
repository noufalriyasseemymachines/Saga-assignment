import { all } from "redux-saga/effects"
import { authSaga } from "./AuthSaga"
import { employeeActionSaga } from "./EmployeeSaga"

export default function* watcherSaga(){
    yield all([
        authSaga(),
        employeeActionSaga()
    ])
}