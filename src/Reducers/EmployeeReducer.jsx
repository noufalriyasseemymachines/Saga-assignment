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

const initialState = {
  employees: [],
  loading: false,
  error: null
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload,
        error: null,
      };
    case FETCH_EMPLOYEE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_EMPLOYEE_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        employees: [...state.employees, action.payload],
      };
    case ADD_EMPLOYEE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case EDIT_EMPLOYEE_REQUEST:
      return { ...state, loading: true, error: null };
    case EDIT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: state.employees.map((emp) =>
          emp.employeeId === action.payload.employeeId ? action.payload : emp
        ),
      };
    case EDIT_EMPLOYEE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_EMPLOYEE_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: state.employees.filter(
          (emp) => emp.employeeId !== action.payload
        ),
        loading: true,
        error: null,
      };
    case DELETE_EMPLOYEE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_EMPLOYEE_BY_ID_REQUEST:
      return {...state,loading:true,error:null};
    
    case GET_EMPLOYEE_BY_ID_SUCCESS:
      return {...state,loading:false,employees:action.payload};

    case GET_EMPLOYEE_BY_ID_FAILURE:
      return {...state,loading:false,error:action.payload};

    default:
        return state
  }
};

export default employeeReducer