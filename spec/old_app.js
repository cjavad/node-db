#!/usr/bin/node
//Node NoSql database by (c) Javad Shafique
//Require modules that are needed

const net = require("net");
const path = require("path");
const auth = require("./lib/auth.js");
const db = require("./lib/db.js");
const fs = require("fs");
const colors = require("colors");

if(process.argv.length < 3){
    console.log("You will need to specify a config file")
    process.exit(0);
}

data = JSON.parse(fs.readFileSync(path.join(__dirname + "/" + process.argv[2])))

//oncaugth exceptions handler
//to make sure that this process never dies
process.on('uncaughtException', function (err) {
    console.log(colors.bgYellow(colors.black("Node NOT Exiting...")), colors.red(colors.bold(err.stack)));
});

//username password config
//and a basic logging message
console.log(auth.config(data.username, data.password) ? "Password is set":"Error Password not set");
const port = data.port || 3434;
const host = data.host || "0.0.0.0";

var server = net.createServer();

server.on("data", (socket) => {
    try {
        //parse json and return
        var raw = data.toString();
        var res = JSON.stringify(db.parse(raw));
        //write response to socket
        socket.write(res, (err) => {
          socket.pipe(socket);
        });
    } catch (err) {
        if(err.name == "TypeError" && res !== undefined){
            console.log(colors.bold(colors.red(err)), colors.yellow(raw));
            socket.write("ERROR", function(err){
              socket.end();
            });
        }else if(res === undefined){
            socket.write("OK", function(err){
              socket.end();
            });
        } else {
            console.log(colors.bold(colors.red(err)), colors.yellow(raw));
            socket.write("Error", function(err){
              socket.end();
            });
        }
    }
});

server.on("connection", (socket) => {
    //On connection log ip and port
    console.log(colors.yellow("Connection from"), colors.rainbow(socket.remoteAddress + ":" + socket.remotePort));
});

//listen on port
server.listen(port, host);


/*leagacy support
//DO NOT USE (Depricated)
if(data.type == "express"){
    console.log(colors.red(colors.bold("Depricated function use socket instead")));
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
}
*/
