#!/usr/bin/node
//Node NoSql database by (c) Javad Shafique
//Require modules that are needed
const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const logger = require("morgan");
var fs = require("fs")

if(process.argv.length < 3){
    console.log("You will need to specify a config file")
    process.exit(0);
}

data = JSON.parse(fs.readFileSync(path.join(__dirname + "/" + process.argv[2])))

//username password config
obj = {
    username: data.username,
    password: data.password
}

//db config
//Express config
const app = express();
const port = data.port || 8080;

//Api config
app.use(logger('dev'));
require("./lib/api.js")(app, obj)

//listen with socket.io
app.listen(port);
