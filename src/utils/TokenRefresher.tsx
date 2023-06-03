import axios from "axios";

////////////////////////////////////////////////////
//
//    TOKEN REFRESHER
//
////////////////////////////////////////////////////

const TokenRefresher = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// axios instance 로 관리하기

TokenRefresher.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      config.headers["access-token"] = null;
      config.headers["refresh-token"] = null;

      console.log("NOT TOKEN");
      return config;
    } else {
      const accessToken = localStorage.getItem("accessToken");
      // const refreshToken = localStorage.getItem("refreshToken");

      config.headers["Authorization"] = `Bearer ${accessToken}`;

      console.log(`Request Start : ${config.headers.Authorization}`);
      return config;
    }
  },
  function (error) {
    console.log("request error", error);
    return Promise.reject(error);
  }
);

TokenRefresher.interceptors.response.use(
  async function (response) {
    // console.log("get response", response);
    if (response.data.status === 401) {
      // token 에 문제가 생겼을 경우 401
      if (response.data.message === "Token Expired") {
        // token 문제 중 기간이 만료되었을 시
        const originalRequest = response.config;
        // 기존 요청 값을 변수로 저장
        console.log("config", originalRequest);
        const refreshToken = await localStorage.getItem("refreshToken");

        console.log("refreshToken", refreshToken);

        const refRes = await axios.get(
          `${process.env.REACT_APP_URL}/api/users/reissue`,
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );
        //refresh-response refresh-token 값을 headers 에 다시 담아서 재요청

        console.log("refRes :", refRes);

        const newAccessToken = refRes.headers["access-token"];
        const newRefreshToken = refRes.headers["refresh-token"];

        await localStorage.setItem("accessToken", newAccessToken);
        await localStorage.setItem("refreshToken", newRefreshToken);
        // 새로 받아온 access-token 과 refreshtoken 을 다시 localStorage에 담음

        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
        // 기존의 요청 header.authorization 에 newAccessToken 을 담아 axios 요청
      }
    }

    return response;
  }
  // async function (error) {
  //   const { config, response } = error;
  //   console.log("error : ", error);
  //   if (response.status === 401) {
  //     if (response.data.message === "Token Expired") {
  //       const originalRequest = config;
  //       console.log("config", originalRequest);
  //       const refreshToken = await localStorage.getItem("refreshToken");
  //       const { data } = await axios.post(
  //         `${process.env.REACT_APP_URL}/users/reissue`,
  //         {},
  //         { headers: { Authorization: `Bearer ${refreshToken}` } }
  //       );
  //       const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
  //         data;
  //       await localStorage.multiSet([
  //         ["accessToken", newAccessToken],
  //         ["refreshToken", newRefreshToken],
  //       ]);
  //       originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
  //       return axios(originalRequest);
  //     }
  //   }
  //   console.log("response error", error);
  //   return Promise.reject(error);
  // }
);

// function(error) 부분은 우리가 설계한 방식과 다르므로 주석처리

export default TokenRefresher;
