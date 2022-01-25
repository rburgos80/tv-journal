require("dotenv/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const entryRoute = require("./routes/entries");
const journalRoute = require("./routes/journals");

app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/entries", entryRoute);
app.use("/journals", journalRoute);

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connected to DB");
});

app.listen(4000);
