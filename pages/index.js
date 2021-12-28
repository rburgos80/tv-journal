import { AppBar, Grid, makeStyles, Paper } from "@material-ui/core";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Showcard from "../components/Showcard";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: theme.palette.grey[200],
  },
}));

export default function Home() {
  const classes = useStyles();
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
      <Paper className={classes.body} elevation={4}>
        <Grid container>
          <Grid item>
            <Showcard
              show={{
                name: "The Sopranos",
                image:
                  "https://static.tvmaze.com/uploads/images/medium_portrait/4/11341.jpg",
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
