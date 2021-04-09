import { combineReducers } from "redux";
import authReducer from "./authReducer";
import tasksReducer from "./tasksReducer";
import errorsReducer from "./errorsReducer";
import projectsReducer from "./projectsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
});
