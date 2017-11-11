#!/usr/bin/node
//Node NoSql database by (c) Javad Shafique
//Require modules that are needed

const path = require("path");
const auth = require("./lib/auth.js")
const db = require("./lib/db.js");
var fs = require("fs")

if(process.argv.length < 3){
    console.log("You will need to specify a config file")
    process.exit(0);
}

data = JSON.parse(fs.readFileSync(path.join(__dirname + "/" + process.argv[2])))

//username password config
auth.config(data.username, data.password);
const = port = data.port || 3434;

if(data.type == "express"){
    //if express
    const express = require("express");
    const logger = require("morgan");
    //db config
    //Express config
    const app = express();

    //Api config
    app.use(logger('dev'));
    require("./lib/api.js")(app, db.db)
    //listen with expressjs
    app.listen(port);
} else if (data.type == "socket") {
    const net = require("net");

    var server = net.createServer(function(socket) {
        socket.on("data", function(data){
            raw = data.toString("utf8");
            try {
                res = JSON.parse(raw);
                socket.write(JSON.stringify(db.parse(raw)));
            } catch (err) {
                if(err.name == "TypeError"){
                    socket.write("OK");
                } else {
                    console.log(err);
                    socket.write("Error");
                }
            }
        })
    });
    
    server.listen(port, '127.0.0.1');
}