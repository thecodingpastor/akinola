import { useContext, useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import NightOwl from "react-syntax-highlighter/dist/cjs/styles/prism/night-owl";
import py from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import r from "react-syntax-highlighter/dist/cjs/languages/prism/r";

import BlogButtons from "../../../components/General/BlogButtons";
import LinkRenderer from "../../../components/General/LinkRenderer";
import classes from "./Blogpost.module.scss";

import PostContext from "../../../context/Post/PostContext";
import Spinner from "../../../components/UI/Spinner";
import CommentTextArea from "../../../components/Pages/SinglePost/Comment/CommentForm";
import Comments from "../../../components/Pages/SinglePost/Comment/Comments";

import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import Spin from "../../../components/UI/Spin";
import GlobalContext from "../../../context/General/GlobalContext";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("r", r);
SyntaxHighlighter.registerLanguage("py", py);

const Post = (props) => {
  const router = useRouter();
  const { post } = props.data;
  const { GetSinglePost, PostIsLoading, Post } = useContext(PostContext);
  const { SetAlert } = useContext(GlobalContext);

  useEffect(() => {
    GetSinglePost(post);

    if (!post) {
      SetAlert({
        message: "That post could not be found at the moment. Try later",
        type: "error",
        title: "Post not found",
      });
      router.replace("/");
    }
  }, []);

  const EvaluateComment =
    Post?.comments?.length > 1
      ? Post?.comments?.length + " comments"
      : Post?.comments?.length === 1
      ? Post?.comments?.length + " comment"
      : "Be the first to comment";

  const { TogglePostLike } = useContext(PostContext);

  if (!Post) return <Spinner />;

  return (
    <>
      <Head>
        <title>{Post.title || "Blogpost"}</title>
      </Head>
      <div
        className={`${classes.Container} ${classes.MarkdownPreviewContainer} MarkdownPreviewContainer`}
      >
        <BlogButtons
          _id={Post._id}
          isPublished={Post.isPublished}
          isSlider={Post.isSlider}
        />
        <h1 className={classes.Title}>{Post.title}</h1>
        <h3 className={classes.Description}>{Post.description}</h3>
        <ReactMarkdown
          children={Post.content}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={NightOwl}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            a: LinkRenderer,
          }}
        />

        <div className="flex-center">
          <footer className={classes.LikeCommentCountContainer}>
            <div style={{ display: "flex" }}>
              {!Post?.likes.includes(localStorage.getItem("akinId")) ? (
                <>
                  {!PostIsLoading ? (
                    <FaRegThumbsUp onClick={() => TogglePostLike(Post?.slug)} />
                  ) : (
                    <Spin />
                  )}
                </>
              ) : (
                <>
                  {!PostIsLoading ? (
                    <FaThumbsUp onClick={() => TogglePostLike(Post?.slug)} />
                  ) : (
                    <Spin />
                  )}
                </>
              )}
              {Post?.likes?.length > 0 && (
                <span className={classes.count}>{Post?.likes.length}</span>
              )}
            </div>
            <div>{EvaluateComment}</div>
          </footer>
        </div>

        <CommentTextArea />
        {Post?.comments?.length > 0 && (
          <Comments comments={Post?.comments || []} />
        )}
      </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const resp = await fetch(`${process.env.APP_URL}/posts/${params.slug}`);
  const data = await resp.json();
  return {
    props: {
      data: data,
    },
  };
}

export default Post;
