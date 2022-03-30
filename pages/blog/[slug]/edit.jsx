import { useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import ProtectedRoute from "../../../components/Layout/ProtectedRoute";

import PostContext from "../../../context/Post/PostContext";

import classes from "./Edit.module.scss";

const Editor = dynamic(
  () => {
    return import("../../../components/Editor/Editor");
  },
  { ssr: false }
);

const EditPost = () => {
  const { Post, GetSinglePostFromBack } = useContext(PostContext);
  const router = useRouter();

  useEffect(() => {
    let timer = setTimeout(() => {
      if (!Post) {
        GetSinglePostFromBack(router.query.slug);
      }
    }, 1);

    return () => clearTimeout(timer);
  }, [Post?._id]);
  return (
    <ProtectedRoute>
      <div className={classes.Container}>
        <Editor postToEdit={Post} editPage />
      </div>
    </ProtectedRoute>
  );
};

export default EditPost;
