//Node NoSql database by (c) Javad Shafique

//Require modules that are needed
const express = require("express");
const path = require("path");
const JsonDB = require("node-json-db");
const auth = require("./lib/auth.js");
const query = require("./lib/query.js");

//Express config
const app = express();
const port = process.env.PORT || 80;

//Database config
const db = new JsonDB("db", true /*To autosave*/, true /*Save in human reable form*/);


