import Link from "next/link";
import Image from "next/image";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";

import classes from "./Post.module.scss";
import checkCharacterLength from "../../../utils/checkCharacterLength";

const Post = ({
  title,
  description,
  coverImage,
  estimatedReadTime,
  slug,
  likes,
  comments,
  createdAt,
}) => {
  const EvaluateComment =
    comments?.length > 1
      ? comments?.length + " comments"
      : comments?.length === 1
      ? comments?.length + " comment"
      : "Be the first to comment";

  return (
    <Link href={`/blog/${slug}`} passHref>
      <div className={classes.Container}>
        <div style={{ width: "100%" }}>
          <Image
            className="image-container"
            src={coverImage || "/images/placeholder.png"}
            width="170"
            height="130"
            blurDataURL="/images/question.jpg"
            placeholder="blur"
            layout="responsive"
            alt={title}
          />
        </div>
        <div className={classes.Heading}>
          <h3 style={{ lineHeight: "1.2", marginBottom: "1rem" }}>
            {checkCharacterLength(title, "title")}
          </h3>
          <div>
            <span>{createdAt} </span>
            <span className={classes.Read}>{estimatedReadTime} mins read</span>
          </div>
        </div>

        <div className={classes.Description}>
          {checkCharacterLength(description)}
        </div>
        <footer>
          <div className={classes.LikeCountContainer}>
            {!likes?.includes(localStorage.getItem("akinId")) ? (
              <FaRegThumbsUp />
            ) : (
              <FaThumbsUp />
            )}
            {likes?.length > 0 && (
              <span className={classes.count}>{likes.length}</span>
            )}
          </div>
          <div className={classes.CommentCountContainer}>{EvaluateComment}</div>
        </footer>
      </div>
    </Link>
  );
};

export default Post;
