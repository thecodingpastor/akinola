import { createContext, useReducer, useContext } from "react";
import { useRouter } from "next/router";

import ProjectReducers from "./ProjectReducers";
import useHttpClient from "../../utils/hooks/useHttpClient";
import AuthContext from "../Auth/AuthContext";

import GlobalContext from "../General/GlobalContext";
import {
  DELETE_PROJECT_TYPE,
  GET_ALL_PROJECTS_TYPE,
  GET_SINGLE_PROJECT_TYPE,
  PROJECT_LOADING_TYPE,
} from "./ProjectTypes";

const INITIAL_STATE = {
  Projects: [],
  Project: null,
  ProjectIsLoading: false,
  ProjectError: null,
};

const ProjectContext = createContext(INITIAL_STATE);

export const ProjectContextProvider = ({ children }) => {
  const MY_URL = process.env.APP_URL;

  const { Token } = useContext(AuthContext);
  const { SetAlert } = useContext(GlobalContext);
  const router = useRouter();
  const [state, ProjectDispatch] = useReducer(ProjectReducers, INITIAL_STATE);
  const { Loading, error, SendRequest } = useHttpClient();

  const GetAllProjects = () => {
    ProjectDispatch({ type: PROJECT_LOADING_TYPE });
    SendRequest(`${MY_URL}/projects`, "GET", null, {
      "Content-Type": "application/json",
    })
      .then((data) => {
        ProjectDispatch({
          type: GET_ALL_PROJECTS_TYPE,
          payload: data.projects,
        });
      })
      .catch((err) => {
        SetAlert({
          type: "error",
          message: err.message,
          title: "Could not fetch Michael's projects for now. Try later",
        });
      });
  };

  const GetSingleProject = (project) => {
    ProjectDispatch({ type: GET_SINGLE_PROJECT_TYPE, payload: project });
  };

  const DeleteProject = (id) => {
    ProjectDispatch({ type: PROJECT_LOADING_TYPE });
    SendRequest(`${MY_URL}/projects/${id}`, "DELETE", null, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    })
      .then(() => {
        ProjectDispatch({ type: DELETE_PROJECT_TYPE, payload: id });

        SetAlert({
          type: "success",
          message: "Project successfully deleted",
          title: "Success",
        });
        router.push("/#projects");
      })
      .catch((err) => {
        SetAlert({
          type: "error",
          message: err.message,
          title: "Delete failed",
        });
      });
  };

  const context = {
    Projects: state.Projects,
    Project: state.Project,
    ProjectIsLoading: Loading,
    ProjectError: error,
    GetAllProjects,
    GetSingleProject,
    DeleteProject,
  };

  return (
    <ProjectContext.Provider value={context}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
