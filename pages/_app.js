import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import Navbars from "../components/Navbars";
import SSRProvider from "react-bootstrap/SSRProvider";
import Container from "react-bootstrap/Container";

// Applies to every page
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    if (!localStorage.getItem("recents")) {
      localStorage.setItem("recents", JSON.stringify([]));
    }
  }, []);

  return (
    <SessionProvider session={session}>
      <SSRProvider>
        <Head>
          <title>TV Journal</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon-16x16.png"
          />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta
            name="description"
            content="Keep a journal on your viewing experiences"
          />
          <meta name="msapplication-TileColor" content="#0275d8" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <Navbars />
        <Container fluid="sm" className="px-0 pb-md-4 my-sm-4">
          <Component {...pageProps} />
        </Container>
      </SSRProvider>
    </SessionProvider>
  );
}

export default MyApp;
