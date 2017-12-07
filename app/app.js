#!/usr/bin/env node
//Node NoSql database by (c) Javad Shafique
//Require modules that are needed

const net = require("net");
const path = require("path");
const auth = require("./lib/auth.js");
const db = require("./lib/dbrunner.js");
const print = require("./lib/print.js");
const fs = require("fs");
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
const pause = data.pause || false;
process.env.LOG = data.LOG || true;
process.env.ERROR = data.ERROR || true;

//create server
var server = net.createServer( (socket) => {
    socket.on("data", (data) => {
    try {
        //convert buffer to string
        var raw = JSON.parse(data.toString());

        //check if user wants to login
        if (raw.command = "login" && Object.keys(raw).includes("username") && Object.keys(raw).includes("password") && socket.key === undefined) {
            var login = auth.login(raw.username, raw.password);
            if (login) {
                //store session id
                socket.db = new db.DB(login);
                socket.key = login;
            } else {
                socket.write(db.error(1, raw));
            }
        } else if (socket.key === undefined) {
            socket.write(db.error(1, raw));
        } else if (auth.isLoggedIn(socket.key)) {
            print.print(socket.key);
            //parse and get response
            var response = socket.db.run(raw);
            //write response
            socket.write(response, (err) => {
                if (err !== undefined) {
                    //if there is an error print.print it in console
                    print.print(colors.red(colors.bold(err)));
                };
            });
        } else {
            socket.write("_ERROR_");
        }

    } catch (_) {
        //if error is an typeerror from the fact that the response writen to the
        //client is undefined write an _OK_ response
        if(_.name === "TypeError" && response == undefined){
            socket.write("_OK_", (err) => {
            if(err !== undefined){
                //if there is an error print.error it in console
                print.error(colors.red(colors.bold(err)));
            };
            });
        //if the error comes from another source
        //write an _ERROR_ response
        } else {
            //else print.error the error stack
            print.error(colors.red(colors.bold(_.stack)));
            socket.write("_ERROR_", (err) => {
            if(err !== undefined){
                //if there is an error print.error it in console
                print.error(colors.red(colors.bold(err)));
                };
            });
        };
        };
    });
});

//log all connections
server.on("connection", (socket) => {
    //On connection log ip and ports
    print.print(colors.yellow("Connection from"), colors.rainbow(socket.remoteAddress + ":" + socket.remotePort));
});

LOG = colors.green("Server listing on port ") + colors.red(port.toString()) + colors.green(" With the settings ") + colors.yellow(JSON.stringify({pause:data.pause, username:data.username, password:data.password}));

//listen on port and host
server.listen(port, host, () => {
  console.log(LOG);
});
