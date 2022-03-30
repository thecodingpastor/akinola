import {
  GLOBAL_ERROR_TYPE,
  SET_ALERT_TYPE,
  SET_PAGE_IS_ROUTING_TYPE,
  TOGGLE_SHOW_MODAL_TYPE,
} from "./GlobalTypes";

export const SET_ALERT = (payload) => ({ type: SET_ALERT_TYPE, payload });
export const SET_SHOW_MODAL = (bool) => ({ type: TOGGLE_SHOW_MODAL_TYPE });
export const SET_PAGE_IS_ROUTING = (bool) => ({
  type: SET_PAGE_IS_ROUTING_TYPE,
});

export const GLOBAL_ERROR = (err) => ({
  type: GLOBAL_ERROR_TYPE,
  payload: err,
});
