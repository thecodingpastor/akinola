import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import ProjectContext from "../../../context/Project/ProjectContext";
import GlobalContext from "../../../context/General/GlobalContext";

import ProtectedRoute from "../../../components/Layout/ProtectedRoute";
import ProjectForm from "../../../components/Pages/Projects/ProjectForm";

const EditProject = () => {
  const router = useRouter();
  const { Project } = useContext(ProjectContext);
  const { SetAlert } = useContext(GlobalContext);

  useEffect(() => {
    if (!Project) {
      router.push("/");
      SetAlert({
        type: "error",
        message: "Could not find project. Try again later",
        title: "Error",
      });
    }
  }, []);
  return (
    <ProtectedRoute>
      <div className="container">
        <ProjectForm
          title={`Edit ''${Project?.title}''`}
          projectToEdit={Project}
        />
      </div>
    </ProtectedRoute>
  );
};

export default EditProject;
