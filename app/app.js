#!/usr/bin/env node
//Node NoSql database by (c) Javad Shafique
//Require modules that are needed

const path = require("path");
const auth = require("./lib/auth.js");
const db = require("./lib/dbrunner.js");
const print = require("./lib/print.js");
const fs = require("fs");
const server = require("./socket");
const colors = require("colors");

//check if all args are provided
if(process.argv.length < 3){
    console.log("You will need to specify a config file");
    process.exit(0);
}

//read config file
data = JSON.parse(fs.readFileSync(path.join(__dirname + "/" + process.argv[2])));

//oncaugth exceptions handler
//to make sure that this process never dies
process.on('uncaughtException', (err) => {
    print.error(colors.bgYellow(colors.black("Node NOT Exiting...")), colors.red(colors.bold(err.stack)));
});

//username password config
//and a basic logging message
auth.init(data.username, data.password);
const port = data.port || 3434;
const host = data.host || "0.0.0.0";
process.env.LOG = data.LOG || true;
process.env.ERROR = data.ERROR || true;
process.env.DEGUB = data.DEGUB || true;

//create server
server(host, port, (log) => {
    print.print(log);
    print.print(colors.yellow("With the settings: ", JSON.stringify({username:data.username, password:data.password})));
});