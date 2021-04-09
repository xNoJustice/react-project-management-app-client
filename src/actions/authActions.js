import API, { setToken } from "../utils/api";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

export const registerUser = (body, history) => (dispatch) => {
  API.post("users/register", { body })
    .then(
      (res) => history.push("/"),
      dispatch({ type: GET_ERRORS, payload: "" })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const loginUser = (body) => (dispatch) => {
  API.post("users/login", { body: body })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("token", token);
      setToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      dispatch({ type: GET_ERRORS, payload: "" });
    })
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

export const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem("token");

  setToken(false);

  dispatch(setCurrentUser({}));

  history && history.push("/dashboard");
};
