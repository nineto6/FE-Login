import { useNavigate } from "react-router-dom";
import Home from "./components/Home";

function App() {
  const nav = useNavigate();

  const pageChange = (url: string) => {
    nav(`${url}`);
  };

  return (
    <div>
      <Home />

      <h1>Welcome !</h1>
      <nav>
        <h4
          onClick={() => {
            pageChange("/login");
          }}
        >
          Login
        </h4>
        <h4
          onClick={() => {
            pageChange("/board");
          }}
        >
          Board
        </h4>
        <h4
          onClick={() => {
            pageChange("/signup");
          }}
        >
          SignUp
        </h4>
      </nav>
    </div>
  );
}

export default App;
