const express = require("express");
const app = express();
const Joi = require("joi");
const config = require("config");
const genres = require("./routes/courses");
const home = require("./routes/home");
const helmet = require("helmet");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

app.use("/", home);
// Routes start with /api/genres will use genres router
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port: ${port}`));
