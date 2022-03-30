import dynamic from "next/dynamic";
import classes from "./create.module.scss";

import ProtectedRoute from "../../components/Layout/ProtectedRoute";

const Editor = dynamic(
  () => {
    return import("../../components/Editor/Editor");
  },
  { ssr: false }
);
const CreatePost = () => {
  return (
    <ProtectedRoute>
      <div className={classes.Container}>
        <Editor />
      </div>
    </ProtectedRoute>
  );
};

export default CreatePost;
