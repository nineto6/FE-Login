import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { boardGetData, OnBoardPostData, OnFormPostData } from "./api";

export interface IFormData {
  userId: String;
  userPw?: String;
}

export interface IBoardData {
  boardTitle: string;
  boardContent: string;
}

interface IDetailProps {
  boardSq: number;
  userNm: string;
  boardTitle: string;
  boardContent: string;
}

interface IInfoProps {
  result: IDetailProps[];
  resultCode: number;
  resultMsg: string;
}

function App() {
  // const { data, isLoading, refetch } = useQuery("userData", getData, {
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },

  //   onError: (error) => {
  //     console.log(error);
  //   },
  // }); // 2023.05.02 현재 GET 요청부분이 없으므로 주석처리

  const { data, isLoading } = useQuery("infoData", boardGetData, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const { mutate } = OnFormPostData();
  const { mutate: axiosMutate } = OnBoardPostData();

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

  const {
    register: boardReg,
    handleSubmit: boardHandle,
    setError: boardSetError,
    formState: { errors: boardErrors },
  } = useForm<IBoardData>();

  const onBoardValid = (data: IBoardData) => {
    axiosMutate(data);
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

      {/* <button onClick={boardGetData}>정보</button> */}
      <ul>
        <li>{`RESULTCODE : ${data?.data.resultCode}`}</li>
        <li>{`RESULT_MESSAGE : ${data?.data.resultMsg}`}</li>
        {data?.data?.result?.map((res: IDetailProps) => (
          <li key={res.boardSq}>
            {`${res.boardContent} ${res.boardSq} ${res.boardTitle} ${res.userNm}`}
          </li>
        ))}
      </ul>

      <br />

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
        }}
        onSubmit={boardHandle(onBoardValid)}
      >
        <input
          {...boardReg("boardTitle", {
            required: "제목을 작성해야 합니다.",
          })}
          placeholder="제목"
        />
        <span>{boardErrors?.boardTitle?.message}</span>
        <input
          {...boardReg("boardContent", {
            required: "글 내용을 작성해야 합니다.",
          })}
          placeholder="글"
        />
        <span>{boardErrors?.boardContent?.message}</span>

        <button>작성하기</button>
      </form>
    </div>
  );
}

export default App;
