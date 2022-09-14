import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Divider, Grid, Stack } from "@mui/material";
import Link from "next/link";
import styled from "@emotion/styled";
import GitHubIcon from "@mui/icons-material/GitHub";
import { AppProvider } from "../src/services/provider";
import { ThemeProvider, createTheme, ThemeOptions } from "@mui/material/styles";

import { Header } from "../src/_shared_";
import { useState } from "react";

const blackColor = "#151B24";
const whiteColor = "white";

const getTheme = () => {
  const themeObject: ThemeOptions = {
    palette: {
      mode: "dark",
      background: {
        default: blackColor,
        paper: blackColor,
      },
      primary: {
        main: "#1976d2",
      },
    },
  };

  return createTheme(themeObject);
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("dark");

  const MainContainer = getMainContainer(theme);
  return (
    <AppProvider>
      <MainContainer>
        <ThemeProvider theme={getTheme()}>
          <main>
            <Grid container spacing={2}>
              <Grid item xs lg={3}>
                &nbsp;
              </Grid>
              <Grid item xs={10} md={8} lg={6}>
                <Header {...{ theme, setTheme }} />
                <Component {...pageProps} />
              </Grid>
              <Grid item xs lg={3}>
                &nbsp;
              </Grid>
            </Grid>
          </main>
          <footer></footer>
        </ThemeProvider>
      </MainContainer>
    </AppProvider>
  );
}

function getMainContainer(theme: string) {
  let backgroundColor = whiteColor;
  let color = blackColor;
  if (theme == "dark") {
    color = whiteColor;
    backgroundColor = blackColor;
  }

  return styled.div`
    background-color: ${backgroundColor};
    color: ${color};
    height: 100vh;
  `;
}
