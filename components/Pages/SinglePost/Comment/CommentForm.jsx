import { useState, useContext } from "react";
import { useRouter } from "next/router";

import Input from "../../../Form/Input";
import Button from "../../../Form/Button";

import classes from "./CommentForm.module.scss";

import checkRange from "../../../../utils/checkRange";
import PostContext from "../../../../context/Post/PostContext";

import { MdOutlineCancel, MdCheckCircle } from "react-icons/md";

const CommentTextArea = () => {
  const postId = useRouter().query.slug;
  const { CommentOnPost } = useContext(PostContext);
  const [Values, setValues] = useState({ comment: "", author: "" });
  // const [ErrorText, setErrorText] = useState("");

  const handleChange = (e) => {
    setValues({ ...Values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    CommentOnPost(postId, { text: Values.comment, author: Values.author });
    setValues({ comment: "", author: "" });
  };

  let commentIsValid =
    checkRange(Values.comment?.trim().length, 2, 301) &&
    Values.comment.trim().length > 0;
  let authorIsValid =
    checkRange(Values.author?.trim().length, 2, 51) &&
    Values.author.trim().length > 0;

  let FormIsValid = authorIsValid && commentIsValid;

  return (
    <form onSubmit={handleSubmit} className={classes.Container}>
      <Input
        border
        name="author"
        id="author"
        placeholder="Your name"
        label={
          !authorIsValid ? (
            <>
              Name must have 3 - 50 characters &nbsp;
              <MdOutlineCancel />
            </>
          ) : (
            <>
              Your name &nbsp; <MdCheckCircle />
            </>
          )
        }
        value={Values.author}
        onChange={handleChange}
      />
      <Input
        element="textarea"
        placeholder="Let's have your thoughts..."
        label={
          !commentIsValid ? (
            <>
              Comment must have 3 - 300 characters &nbsp; <MdOutlineCancel />
            </>
          ) : (
            <>
              Your comment &nbsp; <MdCheckCircle />
            </>
          )
        }
        name="comment"
        id="comment"
        border
        value={Values.comment}
        onChange={handleChange}
      />
      <div style={{ textAlign: "center" }}>
        {FormIsValid ? (
          <Button type="submit" text="Send" fade />
        ) : (
          "Fill in the right details to see the submit button"
        )}
      </div>
    </form>
  );
};

export default CommentTextArea;
