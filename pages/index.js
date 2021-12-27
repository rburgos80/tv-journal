import { AppBar, Grid } from "@material-ui/core";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>TV Journal</title>
        <meta
          name="description"
          content="Keep a journal of your TV show viewing experiences"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container></Grid>
    </div>
  );
}
