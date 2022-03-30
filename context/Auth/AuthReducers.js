import { START_TYPE, FAILURE_TYPE, LOGOUT_TYPE, LOGIN_TYPE } from "./AuthTypes";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case START_TYPE:
      return {
        ...state,
        AuthLoading: true,
        AuthError: null,
      };
    case FAILURE_TYPE:
      return {
        ...state,
        AuthLoading: false,
        AuthError: action.payload.message,
      };
    case LOGIN_TYPE:
      return {
        ...state,
        AuthLoading: false,
        User: action.payload.data?.user,
        IsLoggedIn: true,
        Token: action.payload.token,
      };
    case LOGOUT_TYPE:
      return {
        ...state,
        User: null,
        IsLoggedIn: false,
        Token: null,
        AuthLoading: false,
        AuthError: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
