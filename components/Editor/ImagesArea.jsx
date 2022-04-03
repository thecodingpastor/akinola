import { useRef, useState, useContext } from "react";

import useHttpClient from "../../utils/hooks/useHttpClient";
import CopyUrlButton from "../General/CopyURLButton";
import AuthContext from "../../context/Auth/AuthContext";

import {
  BsFillFileEarmarkArrowUpFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import Button from "../Form/Button";
import Spin from "../UI/Spin";

import classes from "./ImagesArea.module.scss";
import GlobalContext from "../../context/General/GlobalContext";
import Image from "next/image";

const ImagesArea = ({ UploadedFiles, setUploadedFiles, postSlug }) => {
  const { Token } = useContext(AuthContext);

  const { SetAlert } = useContext(GlobalContext);

  const { Loading, SendRequest } = useHttpClient();

  const pickRef = useRef();
  const [PreviewSource, setPreviewSource] = useState("");

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    if (!file) return "";
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!PreviewSource) return;
    uploadFile(PreviewSource);
  };

  const uploadFile = (img) => {
    SendRequest(
      `${process.env.APP_URL}/posts/upload-file`,
      "POST",
      JSON.stringify({ data: img }),
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      }
    )
      .then((data) => {
        setUploadedFiles((prev) => [
          ...prev,
          { url: data.data.secure_url, fileId: data.data.public_id },
        ]);
        setPreviewSource("");
        SetAlert({
          type: "success",
          message: "Copy link to use in your post",
          title: "Upload successful.",
        });
      })
      .catch((err) => {
        SetAlert({
          type: "error",
          message: err.message,
          title: "Could not upload file",
        });
      });
  };

  const deleteFromCloud = (cloudStorageId, databaseId, url) => {
    SendRequest(
      `${process.env.APP_URL}/posts/delete-file`,
      "DELETE",
      JSON.stringify({ cloudStorageId, postSlug, databaseId, url }),
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      }
    )
      .then((data) => {
        if (data.isSingleDeleted) {
          // Deletes unassociated files
          setUploadedFiles(
            UploadedFiles.filter((f) => f.fileId !== data.fileId)
          );
        } else {
          // Deletes files associated to a post
          setUploadedFiles(data.assets);
          SetAlert({
            type: "success",
            message: data.data,
            title: "Success.",
          });
        }
      })
      .catch((err) => {
        SetAlert({
          type: "error",
          message: err.message,
          title: "Something went wrong.",
          duration: 6000,
        });
      });
  };

  return (
    <div className={classes.Container}>
      <div>
        <form onSubmit={handleSubmit} className={classes.PickFile}>
          <input
            type="file"
            name="fileToUpload"
            onChange={handleOnChange}
            ref={pickRef}
            accept="image/*"
            style={{ display: "none" }}
          />
          <div
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => pickRef.current.click()}
          >
            <div
              style={{
                margin: "0 0 2rem",
                fontSize: "2rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              Select an image &nbsp; <BsFillFileEarmarkArrowUpFill />
            </div>
          </div>
          {PreviewSource && (
            <div style={{ position: "relative", cursor: "default" }}>
              <Image
                src={PreviewSource}
                alt="Picked Image"
                width={60}
                height={60}
              />

              <span>Not Upload Yet</span>
            </div>
          )}
          <div>
            {PreviewSource && (
              <>
                {!Loading ? <Button text="Upload" type="submit" /> : <Spin />}
              </>
            )}
          </div>
        </form>
      </div>
      <h4 className="flex-center">
        Uploaded images will be displayed here &nbsp;
        <BsFillArrowDownCircleFill />
      </h4>
      {UploadedFiles?.length > 0 && (
        <div className={classes.UploadedFiles}>
          {UploadedFiles.map((file) => {
            return (
              <div key={file.fileId} className={classes.File}>
                <CopyUrlButton url={file.url} />
                <span style={{ display: "inline-block", position: "relative" }}>
                  <Image src={file.url} width="100" height="100" />

                  {!Loading ? (
                    <AiFillCloseCircle
                      className={classes.CloseBtn}
                      onClick={() =>
                        deleteFromCloud(file.fileId, file._id, file.url)
                      }
                    />
                  ) : (
                    <Spin className={classes.CloseBtn} />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImagesArea;
