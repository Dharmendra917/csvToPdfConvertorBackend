const express = require("express");
const app = express();

//db
require("./models/db.js");

//tiny data(errors)
app.use(require("morgan")("tiny"));

//calling api
app.use(require("cors")({ origin: true, credentials: true }));

//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//base url
app.use("/api/", require("./routers/index.js"));

const port = 4000;
app.listen(port, console.log(`server run on port:${port}`));
