import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import employeeReducer from "./EmployeeReducer";


const rootReducer=combineReducers({
    authRed:authReducer,
    employeRed:employeeReducer
})

export default rootReducer