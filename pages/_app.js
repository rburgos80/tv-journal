import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import userContext from "../context/userContext";
import Navbars from "../components/Navbars";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Head from "next/head";
import SSRProvider from "react-bootstrap/SSRProvider";

function MyApp({ Component, pageProps }) {
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

  return (
    <SSRProvider>
      <Head>
        <title>TV Journal</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <userContext.Provider value={userContextValue}>
        {/* {userData.loading ? <CircularProgress /> : <Component {...pageProps} />} */}
        <Navbars />
        <Component {...pageProps} />
      </userContext.Provider>
    </SSRProvider>
  );
}

export default MyApp;
