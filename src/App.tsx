import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { getData, OnPostData, postData } from "./api";

export interface IFormData {
  userId: String;
  userPw?: String;
}

function App() {
  const { data, isLoading, refetch } = useQuery("userData", getData, {
    onSuccess: (data) => {
      console.log(data);
    },

    onError: (error) => {
      console.log(error);
    },
  }); // 2023.05.02 현재 GET 요청부분이 없으므로 주석처리

  const { mutate } = OnPostData();

  const {
    register,
    /*watch,*/ handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormData>();

  const onValid = (data: IFormData) => {
    mutate(data);
    // refetch(); // 2023.05.02 현재 GET 요청부분이 없으므로 주석처리
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
        }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("userId", {
            required: "아이디를 작성해야 합니다.",
          })}
          placeholder="아이디"
        />
        <span>{errors?.userId?.message}</span>
        <input
          {...register("userPw", {
            required: "비밀번호를 작성해야 합니다.",
            minLength: {
              value: 2,
              message: "비밀번호가 너무 짧습니다.",
            },
          })}
          placeholder="비밀번호"
        />
        <span>{errors?.userPw?.message}</span>

        <button>확인</button>
      </form>

      <ul>
        {/* {data?.((user: IFormData, index: any) => (
          <li key={index}>
            {user.userPw}, {user.userId}
          </li>
        ))} */}
      </ul>
    </div>
  );
}

export default App;
