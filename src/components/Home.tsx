import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TokenRefresher from "../utils/TokenRefresher";

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
