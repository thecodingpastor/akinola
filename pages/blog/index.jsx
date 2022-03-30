import { useEffect, useContext, useRef } from "react";

import Head from "next/head";

import Post from "../../components/Pages/Posts/Post";
import formatDate from "../../utils/myFormatDate";

import classes from "./Index.module.scss";
import PostContext from "../../context/Post/PostContext.js";
import Spinner from "../../components/UI/Spinner";
import AuthContext from "../../context/Auth/AuthContext";

const AllPosts = () => {
  const { GetAllBlogposts, Posts, PostIsLoading } = useContext(PostContext);
  const { IsLoggedIn } = useContext(AuthContext);
  const authRef = useRef(IsLoggedIn);

  useEffect(() => {
    if (Posts.length < 1 || authRef.current !== IsLoggedIn) {
      GetAllBlogposts();
    }
  }, [IsLoggedIn, Posts.length]);

  if (Posts.length === 0)
    return (
      <div style={{ textAlign: "center", marginTop: "2rem", fontSize: "3rem" }}>
        There is no post yet.
      </div>
    );

  return (
    <>
      <Head>
        <title>Michael Akinola - All Posts</title>
      </Head>
      {PostIsLoading ? (
        <Spinner />
      ) : (
        <div className={classes.Container}>
          {Posts.map((post) => {
            return (
              <Post
                key={post._id}
                _id={post._id}
                slug={post.slug}
                title={post.title}
                description={post.description}
                coverImage={post.coverImage}
                createdAt={formatDate(post.createdAt)}
                estimatedReadTime={post.estimatedReadTime}
                comments={post.comments}
                likes={post.likes}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default AllPosts;
