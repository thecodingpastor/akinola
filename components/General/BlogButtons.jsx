import { useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

import classes from "./BlogButtons.module.scss";
import { BiEdit } from "react-icons/bi";
import { BsTrash, BsFileSlides } from "react-icons/bs";
import { TiArrowBack } from "react-icons/ti";
import { AiOutlineSend } from "react-icons/ai";
import PostContext from "../../context/Post/PostContext";
import AuthContext from "../../context/Auth/AuthContext";
import ProjectContext from "../../context/Project/ProjectContext";

import Confirm from "../../components/Modals/Confirm";

const BlogButtons = ({ _id, isPublished, isSlider, isProject }) => {
  useEffect(() => {}, [isPublished, isSlider]);
  const { IsLoggedIn } = useContext(AuthContext);

  const [ShowConfirm, setShowConfirm] = useState(false);
  const [ConfirmMessage, setConfirmMessage] = useState(false);
  const [Action, setAction] = useState();

  const { TogglePublish, DeletePost, ToggleShowInSlider } =
    useContext(PostContext);
  const { DeleteProject } = useContext(ProjectContext);

  const router = useRouter();

  const handleShowConfirm = (message, action) => {
    setShowConfirm(true);
    setConfirmMessage(message);
    setAction(action);
  };

  const handleClose = () => {
    setShowConfirm(false);
    setConfirmMessage();
    setAction();
  };

  const handleClick = () => {
    if (isProject) return DeleteProject(_id);
    if (Action == "delete") return DeletePost(_id);
    if (Action == "publish") return TogglePublish(_id);
    if (Action == "slider") return ToggleShowInSlider(_id);
  };
  const activeSlider = isSlider ? classes.Active : "";
  const activePublish = isPublished ? classes.Active : "";

  return (
    <>
      <div className={classes.Container}>
        {IsLoggedIn ? (
          <>
            <TiArrowBack title="Go Back" onClick={() => router.back()} />
            {!isProject && (
              <>
                <AiOutlineSend
                  className={activePublish}
                  title={isPublished ? "Unpublish" : "Publish"}
                  onClick={() =>
                    handleShowConfirm(
                      `Are you sure you want to ${
                        isPublished ? "UNPUBLISH" : "PUBLISH"
                      } this blog?`,
                      "publish"
                    )
                  }
                />
                <BsFileSlides
                  title={isSlider ? "Remove from sliders" : "Add to sliders"}
                  className={activeSlider}
                  onClick={() =>
                    handleShowConfirm(
                      `Do you really want to ${
                        isSlider
                          ? "REMOVE THIS from the sliders"
                          : "MAKE THIS a slider"
                      }?`,
                      "slider"
                    )
                  }
                />
              </>
            )}
            <BiEdit
              title="Edit"
              onClick={() =>
                !isProject
                  ? router.push("/blog/" + router.query.slug + "/edit")
                  : router.push("/projects/" + router.query.projectId + "/edit")
              }
            />
            <BsTrash
              title="Delete"
              onClick={() =>
                handleShowConfirm(
                  `Are you sure you want to DELETE this ${
                    !isProject ? "Blog" : "Project"
                  }? This action cannot be undone!!!`,
                  "delete"
                )
              }
            />
          </>
        ) : (
          <TiArrowBack title="Go Back" onClick={() => router.back()} />
        )}
      </div>

      <Confirm
        show={ShowConfirm}
        onClose={handleClose}
        onClick={handleClick}
        message={ConfirmMessage}
      />
    </>
  );
};

export default BlogButtons;
