import API from "../utils/api";
import {
  CREATE_TASK,
  UPDATE_TASK,
  COMPLETE_TASK,
  DELETE_TASK,
  GET_TASKS,
  TASKS_LOADING,
} from "./types";

export const createTask = (data) => (dispatch) => {
  API.post("tasks/create", { data })
    .then((res) => dispatch({ type: CREATE_TASK, payload: res.data }))
    .catch((err) => console.log(err));
};

export const updateTask = (data) => (dispatch) => {
  API.patch("tasks/update", { data })
    .then((res) => dispatch({ type: UPDATE_TASK, payload: res.data }))
    .catch((err) => console.log(err));
};

export const completeTask = (id) => (dispatch) => {
  API.patch(`tasks/complete/${id}`)
    .then((res) => dispatch({ type: COMPLETE_TASK, payload: id }))
    .catch((err) => console.log(err));
};

export const deleteTask = (id) => (dispatch) => {
  API.delete(`tasks/delete/${id}`)
    .then((res) => dispatch({ type: DELETE_TASK, payload: id }))
    .catch((err) => console.log(err));
};

export const getTasks = (id, page = 1) => (dispatch) => {
  dispatch(TasksLoading());
  API.get(`tasks/${id}?page=${page}`)
    .then((res) => dispatch({ type: GET_TASKS, payload: res.data }))
    .catch((err) => dispatch({ type: GET_TASKS, payload: null }));
};

export const TasksLoading = () => {
  return { type: TASKS_LOADING };
};
