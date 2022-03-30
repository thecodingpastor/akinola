import {
  CREATE_POST_TYPE,
  GET_SINGLE_POST_TYPE,
  GET_ALL_POSTS_TYPE,
  DELETE_POST_TYPE,
  EDIT_POST_TYPE,
  POST_LOADING_TYPE,
  POST_ERROR_TYPE,
  TOGGLE_PUBLISH_POST_TYPE,
  CLEAR_SINGLE_POST_TYPE,
  TOGGLE_SLIDER_TYPE,
  CREATE_COMMENT_TYPE,
  DELETE_COMMENT_TYPE,
  TOGGLE_LIKE_TYPE,
  GET_SINGLE_POST_FROM_BACKEND_TYPE,
} from "./PostTypes";

export const POST_LOADING = () => ({
  type: POST_LOADING_TYPE,
});
export const POST_ERROR = (err) => ({ type: POST_ERROR_TYPE, payload: err });
export const CREATE_POST = (payload) => ({ type: CREATE_POST_TYPE, payload });
export const CREATE_COMMENT = (payload) => ({
  type: CREATE_COMMENT_TYPE,
  payload,
});
export const GET_SINGLE_POST = (post) => ({
  type: GET_SINGLE_POST_TYPE,
  payload: post,
});
export const GET_SINGLE_POST_FROM_BACKEND = (post) => ({
  type: GET_SINGLE_POST_FROM_BACKEND_TYPE,
  payload: post,
});
export const CLEAR_SINGLE_POST = () => ({
  type: CLEAR_SINGLE_POST_TYPE,
});
export const GET_ALL_POSTS = (posts) => ({
  type: GET_ALL_POSTS_TYPE,
  payload: posts,
});
export const GET_SLIDER_DATA = (sliderData) => ({
  type: GET_SLIDER_DATA_TYPE,
  payload: sliderData,
});
export const EDIT_POST = (post) => ({ type: EDIT_POST_TYPE, payload: post });
export const DELETE_POST = (id) => ({ type: DELETE_POST_TYPE, payload: id });
export const DELETE_COMMENT = (payload) => ({
  type: DELETE_COMMENT_TYPE,
  payload,
});
export const TOGGLE_PUBLISH_POST = () => ({
  type: TOGGLE_PUBLISH_POST_TYPE,
});

export const TOGGLE_SLIDER = () => ({
  type: TOGGLE_SLIDER_TYPE,
});

export const TOGGLE_LIKE = (post) => ({
  type: TOGGLE_LIKE_TYPE,
  post,
});
