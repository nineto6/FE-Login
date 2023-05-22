import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { OnSignUpData } from "../api";
import { useNavigate } from "react-router-dom";
import Home from "../components/Home";

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
  const nav = useNavigate();
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
      nav("/");
    }
  };

  const checkId = async () => {
    const url = `${process.env.REACT_APP_URL}/api/user/duplicheck`;
    await axios
      .get(`${url}?userId=${userIdValue}`)
      .then((res) => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Home />
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
          onChange={() => {
            setChecker(false);
          }}
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
    </div>
  );
}
