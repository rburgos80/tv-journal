import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import Navbars from "../components/Navbars";
import SSRProvider from "react-bootstrap/SSRProvider";
import Container from "react-bootstrap/Container";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <SSRProvider>
        <Head>
          <title>TV Journal</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <Navbars />
        <Container fluid="sm" className="px-0 my-md-4">
          <Component {...pageProps} />
        </Container>
      </SSRProvider>
    </SessionProvider>
  );
}

export default MyApp;
