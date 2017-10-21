//Node NoSql database by (c) Javad Shafique

//Require modules that are needed
const express = require("express");
const path = require("path");
const auth = require("./lib/auth.js");
const query = require("./lib/query.js"); //database is in there
//Database config
const JsonDB = require("node-json-db");
const db = new JsonDB("db", true /*To autosave*/, true /*Save in human reable form*/);
//Express config
const app = express();
const port = process.env.PORT || 8080;

//debuging
var l = query.parse('db.hello.push({a:"My name is javad"}, true)');
console.log(l[1][2]);

//Api config
require("./lib/api.js")(app, query);
//app.listen(port)
