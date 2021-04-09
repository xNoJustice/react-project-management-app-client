import {
  CREATE_TASK,
  DELETE_TASK,
  GET_TASKS,
  TASKS_LOADING,
  UPDATE_TASK,
  COMPLETE_TASK,
} from "../actions/types";

const initialState = {
  tasks: [],
  tasksLoading: false,
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case UPDATE_TASK:
      return state.tasks.map((task) => {
        if (task._id !== action.payload._id) {
          return task;
        }
        return {
          ...task,
          ...action.payload,
        };
      });
    case COMPLETE_TASK:
      return state.tasks.map((task) => {
        if (task._id === action.payload) {
          let updatedTask = {
            ...task,
            done: !task.status,
          };
          return updatedTask;
        }
        return task;
      });
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        tasksLoading: false,
      };
    case TASKS_LOADING:
      return {
        ...state,
        tasksLoading: true,
      };
    default:
      return state;
  }
}
