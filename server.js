const express = require("express");
const app = express();
const genres = require("./routes/genres");
const home = require("./routes/home");
const helmet = require("helmet");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//Secure your app
app.use(helmet());

// Routes start with / will use home router
app.use("/", home);
// Routes start with /api/genres will use genres router
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port: ${port}`));
