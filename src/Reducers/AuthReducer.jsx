import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../Actions/AuthActions";

const initialState = {
  loading: false,
  token: null,
  regError: null,
  logError:null
};

 const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, loading: true, regError: null };
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload,
        loading: false,
        regError: null,
      };
    case REGISTER_FAILURE:
      return { ...state, loading: false, regError: action.payload };
    case LOGIN_REQUEST:
      return { ...state, loading: true, logError: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        logError: null,
        token: action.payload,
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false, logError:action.payload};
    default:
      return state;
  }
};

export default authReducer
