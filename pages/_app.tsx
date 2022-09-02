import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Fragment } from "react";
import { Grid } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <header></header>
      <main>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            &nbsp;
          </Grid>
          <Grid item xs={4}>
            <Component {...pageProps} />
          </Grid>
          <Grid item xs={4}>
            &nbsp;
          </Grid>
        </Grid>
      </main>
      <footer></footer>
    </Fragment>
  );
}

export default MyApp;
