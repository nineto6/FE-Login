import axios from "axios";
import { useMutation } from "react-query";
import { ISignUpData } from "./pages/SignUp";
import { IFormData } from "./pages/Login";
import { IBoardData } from "./pages/Board";
import TokenRefresher from "./utils/TokenRefresher";

export async function boardGetData() {
  const request: HeadersInit = new Headers();
  let token = await localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("error, no token.");
  } else {
    request.set("authorization", token);
  }

  return TokenRefresher.get(`/api/board`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const OnFormPostData = () => {
  return useMutation(formPostData);
};

export const formPostData = async (data: IFormData) => {
  return await TokenRefresher.post(`/api/user/login`, data)
    .then((response) => {
      console.log(response);
      let ACCESS_TOKEN =
        response.headers["access-token"]; /*.replace(/\"/gi, "")*/
      // JSON 형식이므로 JSON.stringify 를 사용해 주어야 한다. (*대소문자 주의*)
      // ACCESS_TOKEN 으로 초기화
      // console.log(ACCESS_TOKEN);

      let REFRESH_TOKEN = response.headers["refresh-token"];

      localStorage.setItem("accessToken", ACCESS_TOKEN);
      localStorage.setItem("refreshToken", REFRESH_TOKEN);

      // console.log(localStorage.getItem("accessToken"));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const OnBoardPostData = () => {
  return useMutation(boardPostData);
};

export const boardPostData = async (data: IBoardData) => {
  let token = await localStorage.getItem("accessToken");

  return await TokenRefresher.post(`/api/board`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => {
    console.log(error);
  });
};

export const OnSignUpData = () => {
  return useMutation(SignUpData);
};

export const SignUpData = async (data: ISignUpData) => {
  return await TokenRefresher.post(`/api/user/signup`, data).then((res) => {
    console.log(res.data);
  });
};
