import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import Head from "next/head";

import { TimerContainer, TodosContainer } from "./containers";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack spacing={2}>
        <TimerWrapper>
          <TimerContainer />
        </TimerWrapper>
        <TodosWrapper>
          <TodosContainer />
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
