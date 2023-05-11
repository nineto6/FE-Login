import axios from "axios";
import { useMutation } from "react-query";
import { IBoardData, IFormData } from "./App";

export const API_URL = `https://nineto6.kro.kr:8080/api/user/login`;
export const BOARD_URL = `https://nineto6.kro.kr:8080/api/board`;
// 변경된 URL 주소

export async function getData() {
  const request: HeadersInit = new Headers();
  let token = await JSON.parse(localStorage.getItem("loginToken") || "{}");
  // 새 Header 에 받아서 JSON 형식으로 바꿔 사용
  // JSON.parse 는 ts 내에서 || 로 빈 {} 값을 보내주어야 type error가 나지않음

  if (!token) {
    throw new Error("error");
  } else {
    request.set("authorization", token);
  }

  return await fetch(BOARD_URL, {
    method: "GET",
    headers: request,
  }).then((response) => {
    // let ACCESS_TOKEN = response.headers.get("Authorization");
    // if (ACCESS_TOKEN) {
    //   localStorage.setItem("loginToken", ACCESS_TOKEN);
    //   // authorization 이 존재할 경우 localStorage 에 leginToken 으로 ACCESS_TOKEN 임시저장
    // }

    // console.log(response.data);
    response.json();
  });
}

export async function axiosGetData() {
  const request: HeadersInit = new Headers();
  let token = await JSON.parse(localStorage.getItem("loginToken") || "{}");
  // 새 Header 에 받아서 JSON 형식으로 바꿔 사용
  // JSON.parse 는 ts 내에서 || 로 빈 {} 값을 보내주어야 type error가 나지않음

  if (!token) {
    throw new Error("error");
  } else {
    request.set("authorization", token);
  }

  return axios.get(BOARD_URL, {
    headers: {
      Authorization: token,
    },
  });
}

export const OnPostData = () => {
  return useMutation(postData);
};

export const postData = async (data: IFormData) => {
  return await axios
    .post(API_URL, data)
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

export const OnAxiosPostData = () => {
  return useMutation(axiosPostData);
};

export const axiosPostData = async (data: IBoardData) => {
  return await axios.post(BOARD_URL, data, {
    headers: {
      Authorization: await JSON.parse(
        localStorage.getItem("loginToken") || "{}"
      ),
    },
  });
};
