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

//oncougth error handler
process.on('uncaughtException', function (err) {
    console.log(db.c.bgYellow(db.c.black("Node NOT Exiting...")), db.c.red(db.c.bold(err)));
  });

//username password config
auth.config(data.username, data.password);
const port = data.port || 3434;

if(data.type == "express"){
    //if express
    const express = require("express");
    //db config
    //Express config
    const app = express();

    //CORS headers
    app.use(function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*, *, *, Accept");
        next();
    });

    app.get("/db", (req, res) => {
        console.log()
        res.send(JSON.stringify(db.parse(req.query.body)));
        return true;
    });

    //listen with expressjs
    app.listen(port);
} else if (data.type == "socket") {
    const net = require("net");

    var server = net.createServer(function(socket) {
        socket.on("data", function(data){
            try {
                var raw = data.toString();
                var res = JSON.stringify(db.parse(raw));
                //Log command
                socket.write(res);
            } catch (err) {
                if(err.name == "TypeError" && res !== undefined){
                    console.log(err);
                    socket.write("ERROR");
                }else if(res === undefined){
                    //console.log(db.c.bold(db.c.red(err)), db.c.yellow(raw));
                    socket.write("OK");
                } else {
                    console.log(err);
                    socket.write("Error");
                }
            }
        })
    });

    server.on("connection", function(socket){
        //On connection log ip and port
        console.log(db.c.yellow("Connection from"), db.c.rainbow(socket.remoteAddress + ":" + socket.remotePort));
    });

    server.listen(port, '0.0.0.0');
}