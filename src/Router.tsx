import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignUp from "./pages/SignUp";

const useRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/login",
      element: <SignUp />,
    },
  ]);

  return router;
};

export default function Router() {
  const router = useRouter();
  return <RouterProvider router={router} />;
}
