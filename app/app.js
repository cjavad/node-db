//Node NoSql database by (c) Javad Shafique

//Require modules that are needed
const express = require("express");
const path = require("path");
const auth = require("./lib/auth.js");
const query = require("./lib/query.js"); //database is in there
//db config
const db = require("./lib/db.js");
//Express config
const app = express();
const port = process.env.PORT || 8080;

//Api config
require("./lib/api.js")(app, query);
app.listen(port);
