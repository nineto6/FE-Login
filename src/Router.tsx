import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Board from "./pages/Board";
import TokenRefresher from "./utils/TokenRefresher";

const useRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <TokenRefresher />
          <App />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <TokenRefresher />
          <SignUp />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <TokenRefresher />
          <Login />
        </>
      ),
    },
    {
      path: "/board",
      element: (
        <>
          <TokenRefresher />
          <Board />
        </>
      ),
    },
  ]);

  return router;
};

export default function Router() {
  const router = useRouter();
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
