import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Divider, Grid, Stack } from "@mui/material";
import Link from "next/link";
import styled from "@emotion/styled";
import GitHubIcon from "@mui/icons-material/GitHub";

import { AppProvider } from "../src/pages/_shared_/app-context";

const navItems = [
  { text: "Home", href: "/" },
  { text: "Stats", href: "/stats" },
  { text: "Settings", href: "/settings" },
];

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
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
                  <Link key={item.text} href={`${item.href}`}>
                    {item.text}
                  </Link>
                ))}
                <Divider />
                <a
                  href="https://github.com/jonattfin/flowometer-web"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHubIcon fontSize="small"></GitHubIcon>
                </a>
                <a
                  href="https://sonarcloud.io/summary/new_code?id=jonattfin_flowometer-web"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="https://sonarcloud.io/api/project_badges/measure?project=jonattfin_flowometer-web&metric=alert_status" />
                </a>
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
    </AppProvider>
  );
}

const MainContainer = styled.div`
  padding: 10px;
`;
