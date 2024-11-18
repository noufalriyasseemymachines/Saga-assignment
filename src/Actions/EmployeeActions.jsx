export const FETCH_EMPLOYEE_REQUEST="FETCH_EMPLOYEE_REQUEST"
export const FETCH_EMPLOYEE_SUCCESS="FETCH_EMPLOYEE_SUCCESS"
export const FETCH_EMPLOYEE_FAILURE="FETCH_EMPLOYEE_FAILURE"

export const ADD_EMPLOYEE_REQUEST="ADD_EMPLOYEE_REQUEST"
export const ADD_EMPLOYEE_SUCCESS="ADD_EMPLOYEE_SUCCESS"
export const ADD_EMPLOYEE_FAILURE="ADD_EMPLOYEE_FAILURE"

export const EDIT_EMPLOYEE_REQUEST="EDIT_EMPLOYEE_REQUEST"
export const EDIT_EMPLOYEE_SUCCESS="EDIT_EMPLOYEE_SUCCESS"
export const EDIT_EMPLOYEE_FAILURE="EDIT_EMPLOYEE_FAILURE"

export const DELETE_EMPLOYEE_REQUEST="DELETE_EMPLOYEE_REQUEST"
export const DELETE_EMPLOYEE_SUCCESS="DELETE_EMPLOYEE_SUCCESS"
export const DELETE_EMPLOYEE_FAILURE="DELETE_EMPLOYEE_FAILURE"

export const GET_EMPLOYEE_BY_ID_REQUEST='GET_EMPLOYEE_BY_ID_REQUEST'
export const GET_EMPLOYEE_BY_ID_SUCCESS='GET_EMPLOYEE_BY_ID_SUCCESS'
export const GET_EMPLOYEE_BY_ID_FAILURE='GET_EMPLOYEE_BY_ID_FAILURE'

export const fetchEmployeeRequest=()=>({
    type:FETCH_EMPLOYEE_REQUEST
})

export const fetchEmployeeSuccess=(employees)=>({
    type:FETCH_EMPLOYEE_SUCCESS,
    payload:employees
})

export const fetchEmployeeFailure=(error)=>({
    type:FETCH_EMPLOYEE_FAILURE,
    payload:error
})

export const addEmployeeRequest=(employees)=>({
    type:ADD_EMPLOYEE_REQUEST,
    payload:employees
})

export const addEmployeeSuccess=(employees)=>({
    type:ADD_EMPLOYEE_SUCCESS,
    payload:employees
})

export const addEmployeeFailure=(error)=>({
    type:ADD_EMPLOYEE_FAILURE,
    payload:error
})

export const editEmployeeRequest=(employees)=>({
    type:EDIT_EMPLOYEE_REQUEST,
    payload:employees
})

export const editEmployeeSuccess=(employees)=>({
    type:EDIT_EMPLOYEE_SUCCESS,
    payload:employees
})

export const editEmployeeFailure=(error)=>({
    type:EDIT_EMPLOYEE_FAILURE,
    payload:error
})

export const deleteEmployeeRequest=(id)=>({
    type:DELETE_EMPLOYEE_REQUEST,
    payload:id
})

export const deleteEmployeeSuccess=(id)=>({
    type:DELETE_EMPLOYEE_SUCCESS,
    payload:id
})

export const deleteEmployeeFailure=(error)=>({
    type:DELETE_EMPLOYEE_FAILURE,
    payload:error
})

export const getEmployeeByIdRequest=(employeeId)=>({
    type:GET_EMPLOYEE_BY_ID_REQUEST,
    payload:employeeId
})

export const getEmployeeByIdSuccess=(employeeData)=>({
    type:GET_EMPLOYEE_BY_ID_SUCCESS,
    payload:employeeData
})

export const getEmployeeByIdFailure=(error)=>({
    type:GET_EMPLOYEE_BY_ID_FAILURE,
    payload:error
})
