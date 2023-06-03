import { useForm } from "react-hook-form";
import { OnFormPostData } from "../api";
import { useNavigate } from "react-router-dom";

export interface IFormData {
  userId: String;
  userPw?: String;
}

export default function Login({ login }: any) {
  const nav = useNavigate();

  const {
    register,
    /*watch,*/ handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormData>();

  const { mutate } = OnFormPostData();

  const onValid = async (data: IFormData) => {
    await mutate(data);
    // refetch(); // 2023.05.02 현재 GET 요청부분이 없으므로 주석처리
    login(true);

    nav("/");
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
    </div>
  );
}
