import "../styles/globals.css";
import userContext from "../context/userContext";
import Navbar from "../components/Navbar";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  CircularProgress,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    loading: true,
  });

  const userContextValue = useMemo(
    () => ({ userData, setUserData }),
    [userData]
  );

  useEffect(() => {
    const checkLoggedIn = () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      axios
        .post("/api/users/token-is-valid", null, {
          headers: { "x-auth-token": token },
        })
        .then((res) => {
          if (res.data) {
            axios
              .get("/api/users", {
                headers: { "x-auth-token": token },
              })
              .then((userRes) => {
                setUserData({
                  token,
                  user: userRes.data,
                  loading: false,
                });
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            setUserData({ loading: false });
          }
        })
        .catch((err) => {
          console.error(err);
        });
      checkLoggedIn();
    };
  }, []);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>TVjournal</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <userContext.Provider value={userContextValue}>
          {/* {userData.loading ? <CircularProgress /> : <Component {...pageProps} />} */}
          <CssBaseline />
          <Navbar />
          <Component {...pageProps} />
        </userContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
