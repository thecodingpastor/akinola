import {
  CREATE_PROJECT_TYPE,
  GET_SINGLE_PROJECT_TYPE,
  GET_ALL_PROJECTS_TYPE,
  DELETE_PROJECT_TYPE,
  EDIT_PROJECT_TYPE,
  PROJECT_LOADING_TYPE,
  PROJECT_ERROR_TYPE,
} from "./ProjectTypes";

export const PROJECT_LOADING = () => ({
  type: PROJECT_LOADING_TYPE,
});
export const PROJECT_ERROR = (err) => ({
  type: PROJECT_ERROR_TYPE,
  payload: err,
});
export const CREATE_PROJECT = (payload) => ({
  type: CREATE_PROJECT_TYPE,
  payload,
});

export const GET_SINGLE_PROJECT = (id) => ({
  type: GET_SINGLE_PROJECT_TYPE,
  payload: id,
});

export const GET_ALL_PROJECTS = (posts) => ({
  type: GET_ALL_PROJECTS_TYPE,
  payload: posts,
});

export const EDIT_PROJECT = (id) => ({ type: EDIT_PROJECT_TYPE, payload: id });
export const DELETE_PROJECT = (id) => ({
  type: DELETE_PROJECT_TYPE,
  payload: id,
});
