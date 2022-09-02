import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import Head from "next/head";
import { useState } from "react";

import { Timer, Todos } from "./components";

export default function Home() {
  const [todo, setSelectedTodo] = useState<string | undefined>("");

  const onSelectedTodoChanged = (todo?: string) => setSelectedTodo(todo);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack spacing={2}>
        <TimerWrapper>
          <Timer text={todo} />
        </TimerWrapper>
        <TodosWrapper>
          <Todos {...{ onSelectedTodoChanged }} />
        </TodosWrapper>
      </Stack>
    </>
  );
}

const TimerWrapper = styled.div`
  background-color: orange;
  border-radius: 5px;
  padding: 3vh;
`;

const TodosWrapper = styled.div`
  padding: 3vh;
  border-radius: 5px;
`;