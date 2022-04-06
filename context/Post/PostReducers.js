import {
  CLEAR_SINGLE_POST_TYPE,
  CREATE_COMMENT_TYPE,
  CREATE_POST_TYPE,
  DELETE_COMMENT_TYPE,
  DELETE_POST_TYPE,
  EDIT_POST_TYPE,
  GET_ALL_POSTS_TYPE,
  GET_SINGLE_POST_FROM_BACKEND_TYPE,
  GET_SINGLE_POST_TYPE,
  GET_SLIDER_DATA_TYPE,
  POST_ERROR_TYPE,
  POST_LOADING_TYPE,
  TOGGLE_LIKE_TYPE,
  TOGGLE_PUBLISH_POST_TYPE,
  TOGGLE_SLIDER_TYPE,
} from "./PostTypes";

const PostReducers = (state, action) => {
  switch (action.type) {
    case POST_LOADING_TYPE:
      return {
        ...state,
        PostIsLoading: true,
        PostError: null,
      };
    case POST_ERROR_TYPE:
      return {
        ...state,
        PostIsLoading: false,
        PostError: action.payload,
      };
    case GET_ALL_POSTS_TYPE:
      return {
        ...state,
        PostIsLoading: false,
        PostError: null,
        Posts: action.payload,
      };
    case GET_SLIDER_DATA_TYPE:
      return {
        ...state,
        PostIsLoading: false,
        PostError: false,
        SliderData: action.payload,
      };
    case CREATE_POST_TYPE:
      return {
        ...state,
        PostIsLoading: false,
        PostError: false,
        Post: action.payload,
        Posts: state.Posts ? [action.payload, ...state.Posts] : [],
      };
    case EDIT_POST_TYPE:
      return {
        ...state,
        PostError: null,
        PostIsLoading: false,
        Post: action.payload,
        Posts: state.Posts
          ? state.Posts.map((post) =>
              post._id === action.payload._id ? action.payload : post
            )
          : [],
      };
    case DELETE_POST_TYPE:
      return {
        ...state,
        PostIsLoading: false,
        PostError: null,
        Posts: state.Posts.filter((post) => post._id !== action.payload),
      };

    case CREATE_COMMENT_TYPE:
      let postToCommentOn = {
        ...state.Post,
        comments: action.payload.comments,
      };
      return {
        ...state,
        PostIsLoading: false,
        PostError: false,
        Post: postToCommentOn,
        Posts: state.Posts.map((post) =>
          post.slug === action.payload.postSlug ? postToCommentOn : post
        ),
      };
    case DELETE_COMMENT_TYPE:
      let postToUpdate = { ...state.Post, comments: action.payload.comments };
      return {
        ...state,
        PostIsLoading: false,
        PostError: false,
        Post: postToUpdate,
        Posts: state.Posts
          ? state.Posts.map((post) =>
              post.slug === action.payload.slug ? postToUpdate : post
            )
          : [],
      };
    case TOGGLE_PUBLISH_POST_TYPE:
      if (state.Posts.length > 0) {
        let postToFind = state.Posts.find(
          (post) => post._id === action.payload.postId
        );
        let publishedPost = {
          ...postToFind,
          isSlider: action.payload.isSlider,
          isPublished: action.payload.isPublished,
        };
        return {
          ...state,
          Posts: state.Posts.map((post) =>
            post._id === action.payload.postId ? publishedPost : post
          ),
          Post: publishedPost,
        };
      } else {
        return {
          ...state,
          Post: {
            ...state.Post,
            isSlider: action.payload.isSlider,
            isPublished: action.payload.isPublished,
          },
        };
      }
    case TOGGLE_SLIDER_TYPE:
      if (state.Posts.length > 0) {
        let postToFind = state.Posts.find(
          (post) => post._id === action.payload.postId
        );
        let sliderPost = {
          ...postToFind,
          isSlider: action.payload.isSlider,
          isPublished: action.payload.isPublished,
        };
        return {
          ...state,
          Posts: state.Posts.map((post) =>
            post._id === action.payload.postId ? sliderPost : post
          ),
          Post: sliderPost,
        };
      } else {
        return {
          ...state,
          Post: {
            ...state.Post,
            isSlider: action.payload.isSlider,
            isPublished: action.payload.isPublished,
          },
        };
      }
    case TOGGLE_LIKE_TYPE:
      return {
        ...state,
        Post: action.payload,
        Posts: state.Posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case GET_SINGLE_POST_TYPE:
      return {
        ...state,
        Post: action.payload,
      };
    case GET_SINGLE_POST_FROM_BACKEND_TYPE:
      return {
        ...state,
        Post: action.payload,
      };
    case CLEAR_SINGLE_POST_TYPE:
      return {
        ...state,
        Post: null,
      };
    default:
      return state;
  }
};

export default PostReducers;
