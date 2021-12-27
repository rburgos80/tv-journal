import "../styles/globals.css";
import userContext from "../context/userContext";
import Navbar from "../components/Navbar";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

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
    <userContext.Provider value={userContextValue}>
      <Navbar />
      {userData.loading ? <CircularProgress /> : <Component {...pageProps} />}
    </userContext.Provider>
  );
}

export default MyApp;
