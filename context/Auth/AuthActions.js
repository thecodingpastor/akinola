import { START_TYPE, FAILURE_TYPE, LOGOUT_TYPE, LOGIN_TYPE, SET_ALERT_TYPE } from "./AuthTypes";

export const START = () => ({
  type: START_TYPE,
});

export const FAILURE = (err) => ({
  type: FAILURE_TYPE,
  payload: err,
});
export const LOGIN = (user) => ({
  type: LOGIN_TYPE,
  payload: user,
});
export const LOGOUT = () => ({ type: LOGOUT_TYPE });

export const SET_ALERT = (payload) => ({type: SET_ALERT_TYPE, payload})
