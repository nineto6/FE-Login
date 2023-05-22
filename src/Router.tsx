import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Board from "./pages/Board";

const useRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/board",
      element: <Board />,
    },
  ]);

  return router;
};

export default function Router() {
  const router = useRouter();
  return <RouterProvider router={router} />;
}
