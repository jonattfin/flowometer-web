import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Fragment, useReducer } from "react";
import { Grid, Stack } from "@mui/material";
import Link from "next/link";
import styled from "@emotion/styled";

import { AppContext } from "../src/pages/_shared_/app-context";

const navItems = [
  { text: "Home", href: "/" },
  { text: "Stats", href: "/stats" },
  { text: "Settings", href: "/settings" },
];

import {
  reducer as todosReducer,
  initialState as todosInitialState,
} from "../src/pages/home/components/todos-reducer";

import {
  reducer as timerReducer,
  initialState as timerInitialState,
} from "../src/pages/home/components/timer-reducer";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [todosState, todosDispatch] = useReducer(
    todosReducer,
    todosInitialState
  );

  const [timerState, timerDispatch] = useReducer(
    timerReducer,
    timerInitialState
  );

  return (
    <AppContext.Provider
      value={{ todosState, todosDispatch, timerState, timerDispatch }}
    >
      <header></header>
      <main>
        <Grid container spacing={2}>
          <Grid item xs lg={3}>
            &nbsp;
          </Grid>
          <Grid item xs={10} md={8} lg={6}>
            <MainContainer>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                alignItems="center"
              >
                {navItems.map((item) => (
                  <Link key={item.text} href={`/${item.href}`}>
                    {item.text}
                  </Link>
                ))}
              </Stack>
            </MainContainer>
            <Component {...pageProps} />
          </Grid>
          <Grid item xs lg={3}>
            &nbsp;
          </Grid>
        </Grid>
      </main>
      <footer></footer>
    </AppContext.Provider>
  );
}

const MainContainer = styled.div`
  padding: 10px;
`;
