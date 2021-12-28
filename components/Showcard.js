import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    cursor: "pointer",
  },
  title: {
    fontSize: "20px",
    textAlign: "center",
  },
}));

const Showcard = ({ show }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        height="295"
        image={`${show.image}`}
        alt={`${show.name} poster`}
        className={classes.image}
      />
      <CardContent>
        <Typography variant="h4" className={classes.title}>
          {show.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Showcard;
