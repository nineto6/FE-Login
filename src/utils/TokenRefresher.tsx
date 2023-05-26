import axios from "axios";
import { response } from "express";

const TokenRefresher = axios.create({
  baseURL: `${process.env.REACT_APP_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

TokenRefresher.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      config.headers["accessToken"] = null;
      config.headers["refreshToken"] = null;

      console.log("NOT TOKEN");
      return config;
    } else {
      const accessToken = localStorage.getItem("accessToken");
      // const refreshToken = localStorage.getItem("refreshToken");

      config.headers["Authorization"] = `Bearer ${accessToken}`;

      console.log(`Request Start : ${config}`);
      return config;
    }
  },
  function (error) {
    console.log("request error", error);
    return Promise.reject(error);
  }
);

TokenRefresher.interceptors.response.use(
  function (response) {
    console.log("get response", response);
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401) {
      if (error.response.data.message === "Token Expired") {
        const originalRequest = config;
        const refreshToken = await localStorage.getItem("refreshToken");

        const { data } = await axios.post(
          `${process.env.REACT_APP_URL}/reissue`,
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data;

        await localStorage.multiSet([
          ["accessToken", newAccessToken],
          ["refreshToken", newRefreshToken],
        ]);

        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    }

    console.log("response error", error);
    return Promise.reject(error);
  }
);

export default TokenRefresher;
