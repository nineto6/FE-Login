import axios from "axios";
import { useMutation } from "react-query";
import { IBoardData, IFormData } from "./App";
import { ISignUpData } from "./SignUp";

export async function boardGetData() {
  const request: HeadersInit = new Headers();
  let token = await JSON.parse(localStorage.getItem("loginToken") || "{}");

  if (!token) {
    throw new Error("error, no token.");
  } else {
    request.set("authorization", token);
  }

  return axios.get(`${process.env.REACT_APP_URL}/api/board`, {
    headers: {
      Authorization: token,
    },
  });
}

export const OnFormPostData = () => {
  return useMutation(formPostData);
};

export const formPostData = async (data: IFormData) => {
  return await axios
    .post(`${process.env.REACT_APP_URL}/api/user/login`, data)
    .then((response) => {
      // console.log(response);
      let ACCESS_TOKEN = JSON.stringify(response.headers["authorization"]);
      // JSON 형식이므로 JSON.stringify 를 사용해 주어야 한다. (*대소문자 주의*)
      // ACCESS_TOKEN 으로 초기화
      // console.log(ACCESS_TOKEN);
      localStorage.setItem("loginToken", ACCESS_TOKEN);

      console.log(localStorage.getItem("loginToken"));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const OnBoardPostData = () => {
  return useMutation(boardPostData);
};

export const boardPostData = async (data: IBoardData) => {
  return await axios
    .post(`${process.env.REACT_APP_URL}/api/board`, data, {
      headers: {
        Authorization: await JSON.parse(
          localStorage.getItem("loginToken") || "{}"
        ),
      },
    })
    .catch((error) => {
      console.log(error);
    });
};

export const OnSignUpData = () => {
  return useMutation(SignUpData);
};

export const SignUpData = async (data: ISignUpData) => {
  return await axios
    .post(`${process.env.REACT_APP_URL}/api/user/signup`, data)
    .then((res) => {
      console.log(res.data);
    });
};
