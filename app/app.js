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
const port = data.port || 3434;

if(data.type == "express"){
    //if express
    const express = require("express");
    //db config
    //Express config
    const app = express();

    //api config
    require("./lib/api.js")(app, db)

    app.get("/db", (req, res) => {
        res.status(200);
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

    server.listen(port, '127.0.0.1');
}