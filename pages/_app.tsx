import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Grid, Stack } from "@mui/material";
import Link from "next/link";
import styled from "@emotion/styled";
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
