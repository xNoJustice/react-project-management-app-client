import API from "../utils/api";
import {
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_PROJECT,
  PROJECT_LOADING,
  GET_PROJECTS,
  PROJECTS_LOADING,
} from "./types";

export const createProject = (data) => (dispatch) => {
  API.post("projects/create", { data })
    .then((res) => dispatch({ type: CREATE_PROJECT, payload: res.data }))
    .catch((err) => console.log(err));
};

export const updateProject = (data) => (dispatch) => {
  API.patch("projects/update", { data })
    .then((res) => dispatch({ type: UPDATE_PROJECT, payload: res.data }))
    .catch((err) => console.log(err));
};

export const deleteProject = (id, history) => (dispatch) => {
  API.delete(`projects/delete/${id}`)
    .then((res) => dispatch({ type: DELETE_PROJECT, payload: id }))
    .then((res) => history.push("/dashboard"))
    .catch((err) => console.log(err));
};

export const getProject = (id) => (dispatch) => {
  dispatch(ProjectLoading());
  API.get(`projects/${id}`)
    .then((res) => dispatch({ type: GET_PROJECT, payload: res.data }))
    .catch((err) => dispatch({ type: GET_PROJECT, payload: null }));
};

export const getProjects = () => (dispatch) => {
  dispatch(ProjectsLoading());
  API.get("projects/")
    .then((res) => dispatch({ type: GET_PROJECTS, payload: res.data }))
    .catch((err) => dispatch({ type: GET_PROJECTS, payload: null }));
};

export const ProjectLoading = () => {
  return { type: PROJECT_LOADING };
};

export const ProjectsLoading = () => {
  return { type: PROJECTS_LOADING };
};
