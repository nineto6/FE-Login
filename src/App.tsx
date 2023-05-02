import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { getData, OnPostData, postData } from "./api";

export interface IFormData {
  nickname: String;
  memberId: String;
  password?: String;
  passwordCheck?: String;
  extraError?: String;
}

function App() {
  const { data, isLoading, refetch } = useQuery("userData", getData, {
    onSuccess: (data) => {
      console.log(data);
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate } = OnPostData();

  const {
    register,
    /*watch,*/ handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormData>();

  const onValid = (data: IFormData) => {
    if (data.password !== data.passwordCheck) {
      setError(
        "passwordCheck",
        { message: "비밀번호가 다릅니다." },
        { shouldFocus: true }
      );
    } else {
      mutate(data);
      refetch();
    }
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
          {...register("nickname", {
            required: "이름을 작성해야 합니다.",
          })}
          placeholder="이름"
        />
        <span>{errors?.nickname?.message}</span>
        <input
          {...register("memberId", {
            required: "아이디를 작성해야 합니다.",
          })}
          placeholder="아이디"
        />
        <span>{errors?.memberId?.message}</span>
        <input
          {...register("password", {
            required: "비밀번호를 작성해야 합니다.",
            minLength: {
              value: 5,
              message: "비밀번호가 너무 짧습니다.",
            },
          })}
          placeholder="비밀번호"
        />
        <span>{errors?.password?.message}</span>
        <input {...register("passwordCheck")} placeholder="비밀번호 확인" />
        <span>{errors?.passwordCheck?.message}</span>

        <button>확인</button>
      </form>

      <ul>
        {data?.map((user: IFormData, index: any) => (
          <li key={index}>
            {user.nickname}, {user.memberId}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
