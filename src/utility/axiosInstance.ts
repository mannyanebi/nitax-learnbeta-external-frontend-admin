import axios from "axios";
import { getCookieItem } from "./cookie";

// configs
// import envs from "../c";

let headers = {};

const axiosInstance = axios.create({
  baseURL: process.env.HOST,
  headers,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const data = getCookieItem("learnbeta_admin")?.data;
    if (data) {
      config.headers.Authorization = `bearer ${data.access_token}`;
    }
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, _reject) => {
      resolve(response);
    }),
  (error) => {
    if (!error.response) {
      return new Promise((_resolve, reject) => {
        reject(error);
      });
    }
    if (error.response?.status === 401 || error.response?.status === 403) {
      // window.location.href = "/auth/signin";
      console.log(error);
    }
    return new Promise((_resolve, reject) => {
      reject(error);
    });
  }
);

export default axiosInstance;
