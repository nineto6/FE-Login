import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { IFormData } from "./App";
import { useMutation } from "react-query";
import { OnSignUpData } from "./api";
import { useNavigate } from "react-router-dom";

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 350px;
`;

export interface ISignUpData {
  userId: string;
  userPw: string;
  userNm: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const [userIdValue, setUserIdValue] = useState("");
  const [checker, setChecker] = useState(false);

  const {
    register,
    /*watch,*/ handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISignUpData>();

  const { mutate } = OnSignUpData();

  const onValid = (data: ISignUpData) => {
    if (checker) {
      mutate(data);

      console.log("SUCCESS");
      navigate("/");
    }
  };

  const checkId = async () => {
    const url = `https://nineto6.kro.kr:8080/api/user/duplicheck`;
    await axios.get(`${url}?userId=${userIdValue}`).then((res) => {
      console.log(res);
      if (res.data.result == "false") {
        setError(
          "userId",
          { message: "중복 아이디 입니다." },
          { shouldFocus: true }
        );
      } else {
        setChecker(true);
      }
    });
  };

  return (
    <>
      <SignUpForm onSubmit={handleSubmit(onValid)}>
        <input
          {...register("userId", {
            required: "아이디를 작성해야 합니다.",
          })}
          onChange={(event) => {
            setUserIdValue(event.target.value);
            // id 감지
          }}
        />
        <span>
          {checker ? "사용 가능한 아이디 입니다." : errors?.userId?.message}
        </span>
        <button onClick={checkId}>중복확인</button>
        <input
          {...register("userPw", {
            required: "비밀번호를 작성해야 합니다.",
          })}
        />
        <span>{errors?.userPw?.message}</span>
        <input
          {...register("userNm", {
            required: "이릉을 작성해야 합니다.",
          })}
        />
        <span>{errors?.userNm?.message}</span>
        <button>submit</button>
      </SignUpForm>
    </>
  );
}