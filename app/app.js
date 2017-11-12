#!/usr/bin/node
//Node NoSql database by (c) Javad Shafique
//Require modules that are needed

const path = require("path");
const auth = require("./lib/auth.js")
const db = require("./lib/database.js");
var fs = require("fs")


if(process.argv.length < 3){
    console.log("You will need to specify a config file")
    process.exit(0);
}

data = JSON.parse(fs.readFileSync(path.join(__dirname + "/" + process.argv[2])))

//username password config
auth.config(data.username, data.password);
const port = data.port || 3434;

if(data.type == "express"){
    //if express
    const express = require("express");
    const logger = require("./lib/log.js");
    //db config
    //Express config
    const app = express();

    //api config
    require("./lib/api.js")(app, db)
    //listen with expressjs
    app.listen(port);
} else if (data.type == "socket") {
    const net = require("net");

    var server = net.createServer(function(socket) {
        socket.on("data", function(data){
            try {
                var raw = data.toString();
                var res = JSON.stringify(db.parse(raw));
                socket.write(res);
            } catch (err) {
                if(err.name == "TypeError" && res !== undefined){
                    console.log(err);
                    socket.write("ERROR");
                }else if(res === undefined){
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