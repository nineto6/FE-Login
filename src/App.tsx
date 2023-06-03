import { useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Logout from "./pages/Logout";
import { useEffect, useState } from "react";
import Login from "./pages/Login";

function App() {
  const [isLogin, setIsLogin] = useState<boolean | null>();
  const nav = useNavigate();

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else setIsLogin(false);
  }, [token]);

  const pageChange = (url: string) => {
    nav(`${url}`);
  };

  return (
    <div>
      <Home />

      <h1>Welcome !</h1>
      <nav>
        {isLogin ? (
          <Logout logout={setIsLogin} />
        ) : (
          <Login login={setIsLogin} />
        )}
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
