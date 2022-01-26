require("dotenv/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 4000;

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const entryRoute = require("./routes/entries");
const journalRoute = require("./routes/journals");

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/entries", entryRoute);
app.use("/api/journals", journalRoute);

app.get("/api", (req, res) => {
  res.json({ msg: "This is the root" });
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connected to DB");
});

app.listen(port);
