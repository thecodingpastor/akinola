import { useContext, useState } from "react";
import { useRouter } from "next/router";

import formatMyDate from "../../../../utils/myFormatDate";

import classes from "./SingleComment.module.scss";

import { BsTrash } from "react-icons/bs";
import PostContext from "../../../../context/Post/PostContext";
import AuthContext from "../../../../context/Auth/AuthContext";

import Confirm from "../../../Modals/Confirm";

const SingleComment = ({ comment }) => {
  const postSlug = useRouter().query.slug;
  const { HandleDeleteComment } = useContext(PostContext);
  const { IsLoggedIn } = useContext(AuthContext);
  const [ShowConfirm, setShowConfirm] = useState(false);

  return (
    <div className={classes.Container}>
      <h2>{comment.author}</h2>
      <span>{formatMyDate(comment.createdAt)}</span>
      <div style={{ textAlign: "justify" }}>{comment.text}</div>
      {IsLoggedIn && <BsTrash onClick={() => setShowConfirm(true)} />}
      <Confirm
        show={ShowConfirm}
        onClose={() => setShowConfirm(false)}
        onClick={() => HandleDeleteComment(comment._id, postSlug)}
        message="Are you sure you want to delete this comment? This cannot be undone."
      />
    </div>
  );
};

export default SingleComment;
