export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const CLEAR_LOG_ERROR = "CLEAR_LOG_ERROR";
export const CLEAR_REGISTER_ERROR = "CLEAR_REGISTER_ERROR";

export const registerRequest = (userDetails, navigate) => ({
  type: REGISTER_REQUEST,
  payload: userDetails,
  navigate: navigate,
});

export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const loginRequest = (credentials, navigate) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
  navigate: navigate,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const clearLogError = () => ({
  type: CLEAR_LOG_ERROR,
});

export const clearRegisterError = () => ({
  type: CLEAR_REGISTER_ERROR,
});
