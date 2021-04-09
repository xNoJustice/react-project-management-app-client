import {
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_PROJECT,
  PROJECT_LOADING,
  GET_PROJECTS,
  PROJECTS_LOADING,
} from "../actions/types";

const initialState = {
  projects: [],
  project: [],
  projectsLoading: false,
  projectLoading: false,
};
export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };
    case UPDATE_PROJECT:
      return state.projects.map((project) => {
        if (project._id !== action.payload._id) {
          return project;
        }
        return {
          ...project,
          ...action.payload,
        };
      });
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
      };
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
        projectsLoading: false,
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        projectsLoading: false,
      };
    case PROJECT_LOADING:
      return {
        ...state,
        projectLoading: true,
      };
    case PROJECTS_LOADING:
      return {
        ...state,
        projectsLoading: true,
      };
    default:
      return state;
  }
}
