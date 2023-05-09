import axios from "axios";
import { useMutation } from "react-query";
import { IFormData } from "./App";
import { json } from "stream/consumers";

const API_URL = `https://nineto6.kro.kr:8080/api/user/login`;
// 변경된 URL 주소

export async function getData() {
  return await fetch(API_URL).then((response) => {
    let ACCESS_TOKEN = response.headers.get("Authorization");
    if (ACCESS_TOKEN) {
      localStorage.setItem("loginToken", ACCESS_TOKEN);
      // authorization 이 존재할 경우 localStorage 에 leginToken 으로 ACCESS_TOKEN 임시저장
    }
    response.json();
  });
}

export const OnPostData = () => {
  return useMutation(postData);
};

export const postData = async (data: IFormData) => {
  return await axios.post(API_URL, data).then((response) => {
    // const { autorization } = response.headers;
    if (response.status === 200) {
      axios
        .post(API_URL, data)
        .then((response) => {
          console.log(response);
          let ACCESS_TOKEN = JSON.stringify(response.headers["authorization"]);
          // JSON 형식이므로 JSON.stringify 를 사용해 주어야 한다. (*대소문자 주의*)
          // ACCESS_TOKEN 으로 초기화
          console.log(ACCESS_TOKEN);
          localStorage.setItem("loginToken", ACCESS_TOKEN);

          console.log(localStorage.getItem("loginToken"));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
};
