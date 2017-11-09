//Node NoSql database by (c) Javad Shafique

//Require modules that are needed
const express = require("express");
const path = require("path");

//db config
//Express config
const app = express();
const port = process.env.PORT || 8080;

//Api config
require("./lib/api.js")(app)
app.listen(port);
