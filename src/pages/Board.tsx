import { useForm } from "react-hook-form";
import { OnBoardPostData, boardGetData } from "../api";
import { useQuery } from "react-query";

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

export default function Board() {
  const { data, isLoading } = useQuery("infoData", boardGetData, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const { mutate: axiosMutate } = OnBoardPostData();

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

      <ul>
        <li>{`RESULTCODE : ${data?.data.resultCode}`}</li>
        <li>{`RESULT_MESSAGE : ${data?.data.resultMsg}`}</li>
        {data?.data?.result?.map((res: IDetailProps) => (
          <li key={res.boardSq}>
            {`${res.boardContent} ${res.boardSq} ${res.boardTitle} ${res.userNm}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
