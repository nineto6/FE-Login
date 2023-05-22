import { useNavigate } from "react-router-dom";

function App() {
  const nav = useNavigate();

  const pageChange = (url: string) => {
    nav(`${url}`);
  };

  return (
    <div>
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
