import { useState, useContext, useRef } from "react";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";

import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import NightOwl from "react-syntax-highlighter/dist/cjs/styles/prism/night-owl";
import py from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import r from "react-syntax-highlighter/dist/cjs/languages/prism/r";

import GlobalContext from "../../context/General/GlobalContext";
import AuthContext from "../../context/Auth/AuthContext";
import PostContext from "../../context/Post/PostContext";

import useHttpClient from "../../utils/hooks/useHttpClient";

import Input from "../Form/Input";
import Button from "../Form/Button";
import ImagesArea from "./ImagesArea";
import Spin from "../UI/Spin";

import classes from "./Editor.module.scss";
import ArrayCompare from "../../utils/arraysCompare";
import { CREATE_POST_TYPE, EDIT_POST_TYPE } from "../../context/Post/PostTypes";
import LinkRenderer from "../General/LinkRenderer";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("r", r);
SyntaxHighlighter.registerLanguage("py", py);

const BeforeUnload = dynamic(
  () => {
    return import("../../components/General/BeforeUnload");
  },
  { ssr: false }
);

const TextEditor = ({ postToEdit = null, editPage = null }) => {
  const { SetAlert } = useContext(GlobalContext);
  const { Token } = useContext(AuthContext);
  const { PostDispatch } = useContext(PostContext);

  const { Loading, SendRequest } = useHttpClient();
  const [UploadedFiles, setUploadedFiles] = useState(
    postToEdit?.assets.length > 0 ? postToEdit?.assets : []
  );
  const [BlogPost, setBlogPost] = useState({
    title: postToEdit?.title || "",
    description: postToEdit?.description || "",
    estimatedReadTime: postToEdit?.estimatedReadTime || "",
    content: postToEdit?.content || "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setBlogPost({
      ...BlogPost,
      [e.target.name]: e.target.value,
    });

    if (editPage) {
      setEditIsBlocked(
        BlogPost.title?.trim() !== titleRef.current ||
          BlogPost.description?.trim() !== descriptionRef.current ||
          BlogPost.content?.trim() !== contentRef.current ||
          BlogPost.estimatedReadTime?.trim() !== estimatedReadTimeRef.current ||
          !ArrayCompare(UploadedFiles, UploadedFilesRef.current)
      );
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (BlogPost.content.trim().length < 100)
      return SetAlert({
        type: "error",
        message: "Your post cannot be less than 100 characters.",
        title: "Error",
      });

    if (BlogPost.title.trim().length < 5)
      return SetAlert({
        type: "error",
        message: "Title cannot be less than 5 characters.",
        title: "Error",
      });

    if (BlogPost.description.trim().length < 100)
      return SetAlert({
        type: "error",
        message: "Description cannot be less than 100 characters.",
        title: "Error",
      });

    if (!BlogPost.estimatedReadTime)
      return SetAlert({
        type: "error",
        message: "Estimated time must be filled",
        title: "Error",
      });

    let coverImage;
    if (UploadedFiles.length > 0) {
      coverImage = UploadedFiles[0].url;
    } else {
      coverImage = "";
    }

    const method = !editPage ? "POST" : "PATCH";
    const endPoint = !editPage
      ? `${process.env.APP_URL}/posts`
      : `${process.env.APP_URL}/posts/${router.query.slug}`;

    SendRequest(
      endPoint,
      method,
      JSON.stringify({
        title: BlogPost.title,
        coverImage,
        estimatedReadTime: BlogPost.estimatedReadTime,
        description: BlogPost.description,
        content: BlogPost.content,
        assets: UploadedFiles,
      }),
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      }
    )
      .then((data) => {
        setBlogPost({
          title: "",
          estimatedReadTime: "",
          description: "",
          content: "",
        });
        setUploadedFiles([]);
        SetAlert({
          type: "success",
          message: !editPage ? "New post created" : "Post edited successfully",
          title: "Success",
        });
        if (data.newPost) {
          PostDispatch({ type: CREATE_POST_TYPE, payload: data.newPost });
          router.push("/blog/" + data.newPost.slug);
        } else if (data.updatedPost) {
          setEditIsBlocked(false);
          PostDispatch({ type: EDIT_POST_TYPE, payload: data.updatedPost });
          router.push("/blog/" + data.updatedPost.slug);
        } else {
          router.push("/");
        }
      })
      .catch((err) => {
        SetAlert({
          type: "error",
          message: err.message,
          title: "Something went wrong.",
        });
      });
  };

  let createIsBlocked =
    BlogPost.title?.trim().length > 5 ||
    BlogPost.description?.trim().length > 10 ||
    BlogPost.content?.trim().length > 15 ||
    UploadedFiles.length > 0;

  let titleRef = useRef(postToEdit?.title && postToEdit?.title);
  let contentRef = useRef(postToEdit?.content && postToEdit?.content);
  let estimatedReadTimeRef = useRef(
    postToEdit?.estimatedReadTime && postToEdit?.estimatedReadTime
  );
  let descriptionRef = useRef(
    postToEdit?.description && postToEdit?.description
  );
  let UploadedFilesRef = useRef(postToEdit?.assets && postToEdit?.assets);

  const [EditIsBlocked, setEditIsBlocked] = useState(
    editPage &&
      (BlogPost.title?.trim() !== titleRef.current ||
        BlogPost.description?.trim() !== descriptionRef.current ||
        BlogPost.content?.trim() !== contentRef.current ||
        BlogPost.estimatedReadTime?.trim() !== estimatedReadTimeRef.current ||
        !ArrayCompare(UploadedFiles, UploadedFilesRef.current))
  );

  const createPageUnload = () => {
    if (UploadedFiles.length > 0) {
      UploadedFiles.forEach((file, index) => {
        // Dont need url since its just deleting from only cloudinary
        SendRequest(
          `${process.env.APP_URL}/posts/delete-file`,
          "DELETE",
          JSON.stringify({ cloudStorageId: file.fileId }),
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          }
        )
          .then(() => {
            if (index + 1 === UploadedFiles.length) {
              SetAlert({
                type: "success",
                message: "Files deleted successfully",
              });
            }
          })
          .catch((err) => {
            const type =
              err.message == "The user aborted a request."
                ? "success"
                : "error";
            // The user aborted a request.
            SetAlert({
              type: type,
              message: type == "success" ? "Data deleted" : err.message,
              title: type == "success" ? "Success" : "Something went wrong.",
            });
          });
      });
    }
  };

  return (
    <BeforeUnload
      blockRoute={!editPage ? createIsBlocked : EditIsBlocked}
      unloadFunc={!editPage ? createPageUnload : () => {}}
    >
      <>
        <i>
          If you have any challenge using markdown, check{" "}
          <a
            href="https://www.markdownguide.org/cheat-sheet/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              textDecoration: "underline",
            }}
          >
            Cheat Sheet
          </a>
          {"  "}or {"  "}
          <a
            href="https://help.smash.gg/en/articles/1987102-customizing-text-with-markdown#:~:text=By%20default%2C%20all%20text%20in,the%20text%20in%20div%20tags."
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              textDecoration: "underline",
            }}
          >
            This wonderful resource
          </a>
        </i>
        <h1 className="text-center">
          {postToEdit?.title
            ? `Edit ''${postToEdit?.title}''`
            : "Create a new post"}
        </h1>
        <Input
          name="title"
          value={BlogPost.title}
          onChange={handleChange}
          className={classes.Input}
          placeholder="Title"
          label="Title"
          required
        />
        <Input
          type="number"
          name="estimatedReadTime"
          value={BlogPost.estimatedReadTime}
          onChange={handleChange}
          className={classes.Input}
          placeholder="Estimated Read Time in mins"
          label="Estimated Read Time in mins"
          required
        />

        <Input
          element="textarea"
          id="description"
          name="description"
          value={BlogPost.description}
          onChange={handleChange}
          placeholder="Description"
          label="Description"
          required
        />

        <ImagesArea
          UploadedFiles={UploadedFiles}
          setUploadedFiles={setUploadedFiles}
          editPage={editPage}
          postSlug={postToEdit?.slug}
        />
        <Input
          element="autotextarea"
          placeholder="What are you sharing with the world today 😀?"
          label="Enter markdown"
          onChange={handleChange}
          value={BlogPost.content}
          id="content"
          name="content"
        />

        <div className="flex-center" style={{ marginTop: "2rem" }}>
          {!Loading ? (
            <Button text="Save Post" handleClick={onSubmit} />
          ) : (
            <Spin />
          )}
        </div>
        <div
          className={`${classes.MarkdownPreviewContainer} MarkdownPreviewContainer `}
        >
          <h1 className="flex-center">
            <span className={classes.PreviewHeader}>Preview of Post</span>
          </h1>
          <ReactMarkdown
            children={BlogPost.content}
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
        </div>
      </>
    </BeforeUnload>
  );
};
export default TextEditor;
