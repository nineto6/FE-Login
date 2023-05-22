import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { boardGetData, OnBoardPostData, OnFormPostData } from "./api";
import Login from "./pages/Login";
import Board from "./pages/Board";

function App() {
  return (
    <div>
      <Login />
      <Board />
    </div>
  );
}

export default App;
