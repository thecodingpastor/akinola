import SingleComment from "./SingleComment";

import classes from "./Comments.module.scss";

const Comments = ({ comments }) => {
  return (
    <div className={classes.Container}>
      <h2 className="text-center">Comments</h2>
      {comments.map((comment) => (
        <SingleComment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
