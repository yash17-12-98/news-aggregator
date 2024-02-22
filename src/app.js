const express = require("express");
const authRoute = require("./routes/auth.route.js");
const preferencesRoute = require("./routes/preferences.route.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

const port = process.env.PORT;

app.use("/users", authRoute);
app.use("/users/preferences", preferencesRoute);

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
