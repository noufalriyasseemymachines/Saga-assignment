import {
  CLEAR_LOG_ERROR,
  CLEAR_REGISTER_ERROR,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../Actions/AuthActions";

const initialState = {
  regloading: false,
  logloading:false,
  token: null,
  regError: null,
  logError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, regloading: true, regError: null,logloading:false };
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload,
        regloading: false,
        logloading:false,
        regError: null,
      };
    case REGISTER_FAILURE:
      return { ...state, regloading: false, regError: action.payload,logloading:false };
    case LOGIN_REQUEST:
      return { ...state, logloading: true, logError: null,regloading:false };
    case LOGIN_SUCCESS:
      return {
        ...state,
        logloading: false,
        regloading:false,
        logError: null,
        token: action.payload,
      };
    case LOGIN_FAILURE:
      return { ...state, logloading: false, logError: action.payload,regloading:false };
    case CLEAR_LOG_ERROR:
      return { ...state, logError: null };
    case CLEAR_REGISTER_ERROR:
      return { ...state, regError: null };
    default:
      return state;
  }
};

export default authReducer;
