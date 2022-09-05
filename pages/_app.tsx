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
          <Grid item xs lg={3}>
            &nbsp;
          </Grid>
          <Grid item xs={10} md={8} lg={6}>
            <Component {...pageProps} />
          </Grid>
          <Grid item xs lg={3}>
            &nbsp;
          </Grid>
        </Grid>
      </main>
      <footer></footer>
    </Fragment>
  );
}

export default MyApp;
