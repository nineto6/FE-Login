import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { OnSignUpData } from "../api";
import { useNavigate } from "react-router-dom";
import Home from "../components/Home";
import TokenRefresher from "../utils/TokenRefresher";

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
    register: signRegister,
    /*watch,*/ handleSubmit: signHandleSubmit,
    setError: signSetError,
    formState: { errors: signErrors },
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
    const url = `/api/users/duplicheck`;

    // console.log(userIdValue);

    if (userIdValue === "") {
      signSetError(
        "userId",
        { message: "아이디를 작성해야 합니다." },
        { shouldFocus: true }
      );
    } else {
      await TokenRefresher.get(`${url}?userId=${userIdValue}`)
        .then((res) => {
          console.log(res);
          if (res.data.result == "false") {
            signSetError(
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
    }
  };

  return (
    <>
      <Home />
      <SignUpForm onSubmit={signHandleSubmit(onValid)}>
        <input
          {...signRegister("userId", {
            required: "아이디를 작성해야 합니다.",
          })}
          onChange={(event) => {
            setUserIdValue(event.target.value);
            // id 감지

            setChecker(false);
          }}
        />
        <span>
          {checker ? "사용 가능한 아이디 입니다." : signErrors?.userId?.message}
        </span>
        <button onClick={checkId}>중복확인</button>
        <input
          {...signRegister("userPw", {
            required: "비밀번호를 작성해야 합니다.",
          })}
        />
        <span>{signErrors?.userPw?.message}</span>
        <input
          {...signRegister("userNm", {
            required: "이릉을 작성해야 합니다.",
          })}
        />
        <span>{signErrors?.userNm?.message}</span>
        <button>submit</button>
      </SignUpForm>
    </>
  );
}
