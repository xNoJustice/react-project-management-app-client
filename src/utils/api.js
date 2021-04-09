import axios from "axios";

const TOKEN = localStorage.getItem("token");

let API = axios.create({
  baseURL: `http://localhost:5000/api/`,
  headers: {
    "Content-Type": "application/json",
    Authorization: TOKEN,
  },
});

export const setToken = (token = TOKEN) => {
  API.interceptors.request.use(function (config) {
    config.headers.Authorization = token;
    return config;
  });
};

API.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      window.location.href = "./";
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);

export default API;
