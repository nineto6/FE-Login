import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignUp from "./SignUp";

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
  ]);

  return router;
};

export default function Router() {
  const router = useRouter();
  return <RouterProvider router={router} />;
}
