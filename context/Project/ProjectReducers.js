import {
  PROJECT_ERROR_TYPE,
  PROJECT_LOADING_TYPE,
  DELETE_PROJECT_TYPE,
  GET_ALL_PROJECTS_TYPE,
  GET_SINGLE_PROJECT_TYPE,
} from "./ProjectTypes";

const ProjectReducers = (state, action) => {
  switch (action.type) {
    case PROJECT_LOADING_TYPE:
      return {
        ...state,
        ProjectIsLoading: true,
        ProjectError: null,
      };
    case PROJECT_ERROR_TYPE:
      return {
        ...state,
        ProjectIsLoading: false,
        ProjectError: action.payload,
      };
    case GET_ALL_PROJECTS_TYPE:
      return {
        ...state,
        ProjectIsLoading: false,
        ProjectError: null,
        Projects: action.payload,
      };
    case GET_SINGLE_PROJECT_TYPE:
      return {
        ...state,
        Project: action.payload,
      };
    case DELETE_PROJECT_TYPE:
      return {
        ...state,
        ProjectIsLoading: false,
        ProjectError: null,
        Projects: state.Projects.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};

export default ProjectReducers;
