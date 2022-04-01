import { createContext, useReducer, useContext } from "react";
import { useRouter } from "next/router";

import PostReducers from "./PostReducers";
import useHttpClient from "../../utils/hooks/useHttpClient";
import AuthContext from "../../context/Auth/AuthContext";

import GlobalContext from "../General/GlobalContext";
import {
  CLEAR_SINGLE_POST_TYPE,
  CREATE_COMMENT_TYPE,
  DELETE_COMMENT_TYPE,
  DELETE_POST_TYPE,
  GET_ALL_POSTS_TYPE,
  GET_SINGLE_POST_FROM_BACKEND_TYPE,
  GET_SINGLE_POST_TYPE,
  GET_SLIDER_DATA_TYPE,
  POST_LOADING_TYPE,
  TOGGLE_LIKE_TYPE,
  TOGGLE_PUBLISH_POST_TYPE,
  TOGGLE_SLIDER_TYPE,
} from "./PostTypes";

const INITIAL_STATE = {
  Posts: [],
  Post: null,
  PostIsLoading: false,
  PostError: null,
  SliderData: [],
};

const PostContext = createContext(INITIAL_STATE);

export const PostContextProvider = ({ children }) => {
  const MY_URL = process.env.APP_URL;

  const { Token, User } = useContext(AuthContext);
  const { SetAlert } = useContext(GlobalContext);
  const router = useRouter();
  const [state, PostDispatch] = useReducer(PostReducers, INITIAL_STATE);
  const { Loading, error, SendRequest } = useHttpClient();

  const GetSliderData = () => {
    PostDispatch({ type: POST_LOADING_TYPE });

    SendRequest(`${MY_URL}/posts/slider-data`, "GET", null, {
      "Content-Type": "application/json",
    })
      .then((data) => {
        PostDispatch({ type: GET_SLIDER_DATA_TYPE, payload: data.sliderData });
      })
      .catch((err) => {
        SetAlert({
          type: "error",
          message: err.message,
          title: "Could not fetch sliders. Try later",
          duration: 6000,
        });
      });
  };

  const GetAllBlogposts = () => {
    PostDispatch({ type: POST_LOADING_TYPE });
    let userId = User?._id || "";
    SendRequest(`${MY_URL}/posts?userId=${userId}`, "GET", null, {
      "Content-Type": "application/json",
    })
      .then((data) => {
        PostDispatch({ type: GET_ALL_POSTS_TYPE, payload: data.posts });
      })
      .catch((err) => {
        SetAlert({
          type: "error",
          message: err.message,
          title: "Could not fetch blog posts. Try later",
          duration: 6000,
        });
      });
  };

  const GetSinglePost = (post) => {
    PostDispatch({ type: GET_SINGLE_POST_TYPE, payload: post });
  };

  const GetSinglePostFromBack = (slug) => {
    PostDispatch({ type: POST_LOADING_TYPE });
    SendRequest(`${MY_URL}/posts/${slug}`, "GET", null, {
      "Content-Type": "application/json",
    })
      .then((data) => {
        PostDispatch({
          type: GET_SINGLE_POST_FROM_BACKEND_TYPE,
          payload: data.post,
        });
      })
      .catch((err) => {
        SetAlert({
          type: "error",
          message: err.message,
          title: "Could not fetch blog posts. Try later",
          duration: 6000,
        });
      });
  };

  const ClearSinglePost = () => {
    PostDispatch({ type: CLEAR_SINGLE_POST_TYPE });
  };

  const ToggleShowInSlider = (postId) => {
    PostDispatch({ type: POST_LOADING_TYPE });
    SendRequest(`${MY_URL}/posts/toggle-slider/${postId}`, "PATCH", null, {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    })
      .then((data) => {
        PostDispatch({
          type: TOGGLE_SLIDER_TYPE,
          payload: {
            isSlider: data.isSlider,
            isPublished: data.isPublished,
            postId: postId,
          },
        });
        SetAlert({
          type: "success",
          message: data.isSlider
            ? "Post will NOW APPEAR in the slider"
            : "Post will NO LONGER APPEAR in the slider",
          title: data.isSlider ? "Added to slider" : "Removed from slider",
        });
      })
      .catch((err) => {
        SetAlert({
          type: "error",
          message: err.message,
          title: "Error",
          duration: 10000,
        });
      });
  };

  const TogglePublish = (postId) => {
    PostDispatch({ type: POST_LOADING_TYPE });
    SendRequest(`${MY_URL}/posts/toggle-publish/${postId}`, "PATCH", null, {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    })
      .then((data) => {
        PostDispatch({
          type: TOGGLE_PUBLISH_POST_TYPE,
          payload: {
            isSlider: data.isSlider,
            isPublished: data.isPublished,
            postId: postId,
          },
        });
        SetAlert({
          type: "success",
          message: data.isPublished
            ? "Post will NOW APPEAR for all to see"
            : "Post will NO LONGER APPEAR for all to see",
          title: data.isPublished ? "Post published" : "Post saved to drafts",
        });
      })
      .catch((err) => {
        SetAlert({
          type: "error",
          message: err.message,
          title: "Could not publish blog post. Try later",
        });
      });
  };

  const DeletePost = (slug) => {
    PostDispatch({ type: POST_LOADING_TYPE });
    SendRequest(`${MY_URL}/posts/${slug}`, "DELETE", null, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    })
      .then(() => {
        PostDispatch({ type: DELETE_POST_TYPE, payload: slug });

        SetAlert({
          type: "success",
          message: "Post will no longer appear for all to see",
          title: "Post successfully deleted",
        });
        router.push("/blog");
      })
      .catch((err) => {
        SetAlert({
          type: "error",
          message: err.message,
          title: "Delete failed",
        });
      });
  };

  const CommentOnPost = (slug, body) => {
    PostDispatch({ type: POST_LOADING_TYPE });
    SendRequest(
      `${MY_URL}/posts/${slug}/create-comment`,
      "POST",
      JSON.stringify({ data: body }),
      {
        "Content-Type": "application/json",
      }
    )
      .then((data) => {
        PostDispatch({
          type: CREATE_COMMENT_TYPE,
          payload: { postSlug: slug, comments: data.comments },
        });
        SetAlert({
          type: "success",
          message: "Comment created successfully",
          title: "Success",
        });
      })
      .catch((err) => {
        SetAlert({
          type: "error",
          message: err.message,
          title: "Error, comment not created!",
        });
      });
  };

  const HandleDeleteComment = (commentId, postSlug) => {
    PostDispatch({ type: POST_LOADING_TYPE });
    SendRequest(
      `${MY_URL}/posts/${postSlug}/delete-comment`,
      "POST",
      JSON.stringify({ commentId }),
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      }
    )
      .then((data) => {
        console.log(data);
        PostDispatch({
          type: DELETE_COMMENT_TYPE,
          payload: { postSlug, comments: data.comments },
        });
        SetAlert({
          type: "success",
          message: "Comment deleted successfully",
          title: "Success",
        });
      })
      .catch((err) => {
        SetAlert({
          type: "error",
          message: err.message,
          title: "Error, comment not deleted!",
        });
      });
  };

  const TogglePostLike = (postSlug) => {
    let author = localStorage.getItem("akinId");

    PostDispatch({ type: POST_LOADING_TYPE });
    SendRequest(
      `${MY_URL}/posts/${postSlug}/react`,
      "POST",
      JSON.stringify({ author }),
      {
        "Content-Type": "application/json",
      }
    )
      .then((data) => {
        if (!author) localStorage.setItem("akinId", data.newLikeAuthor);
        PostDispatch({
          type: TOGGLE_LIKE_TYPE,
          payload: data.post,
        });
      })
      .catch((err) => {
        SetAlert({
          type: "error",
          message: err.message,
          title: "Error!",
        });
      });
  };

  const context = {
    Posts: state.Posts,
    Post: state.Post,
    SliderData: state.SliderData,
    PostIsLoading: Loading,
    PostError: error,
    GetAllBlogposts,
    GetSliderData,
    GetSinglePost,
    GetSinglePostFromBack,
    ClearSinglePost,
    TogglePublish,
    ToggleShowInSlider,
    DeletePost,
    CommentOnPost,
    HandleDeleteComment,
    TogglePostLike,
    PostDispatch,
  };

  return (
    <PostContext.Provider value={context}>{children}</PostContext.Provider>
  );
};

export default PostContext;
