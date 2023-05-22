import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  const pageChange = (url: string) => {
    nav(`${url}`);
  };

  return (
    <div>
      <h1
        onClick={() => {
          pageChange("/");
        }}
      >
        NINETO6
      </h1>
    </div>
  );
}
