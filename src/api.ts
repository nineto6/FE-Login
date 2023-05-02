import axios from "axios";
import { useMutation } from "react-query";
import { IFormData } from "./App";

const API_URL = `http://nineto6.kro.kr:8080/api/user/login`;
// 변경된 URL 주소

export async function getData() {
  return await fetch(API_URL).then((response) => response.json());
}

export const OnPostData = () => {
  return useMutation(postData);
};

export const postData = (data: IFormData) => {
  return axios.post(API_URL, data);
};
