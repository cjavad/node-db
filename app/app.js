#!/usr/local/bin/node
//Node NoSql database by (c) Javad Shafique
//Require modules that are needed

const net = require("net");
const path = require("path");
const auth = require("./lib/auth.js");
const db = require("./lib/db.js");
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
    console.log(colors.bgYellow(colors.black("Node NOT Exiting...")), colors.red(colors.bold(err.stack)));
});

//username password config
//and a basic logging message
auth.config(data.username, data.password);
const port = data.port || 3434;
const host = data.host || "0.0.0.0";
const pause = data.pause || false;

//create server
var server = net.createServer( (socket) => {
  socket.on("data", (data) => {
    try {
      //convert buffer to string
      var raw = data.toString();
      //parse and get response
      var response = JSON.stringify(db.parse(raw));
      //write response
      socket.write(response, (err) => {
        if(err !== undefined){
          //if there is an error print it in console
          console.log(colors.red(colors.bold(err)));
        };
      });
    } catch (_) {
      //if error is an typeerror from the fact that the response writen to the
      //client is undefined write an _OK_ response
      if(_.name === "TypeError" && response == undefined){
        socket.write("_OK_", (err) => {
          if(err !== undefined){
            //if there is an error print it in console
            console.log(colors.red(colors.bold(err)));
          };
        });
      //if the error comes from another source
      //write an _ERROR_ response
      } else {
        //else print the error stack
        console.log(colors.red(colors.bold(_.stack)));
        socket.write("_ERROR_", (err) => {
          if(err !== undefined){
            //if there is an error print it in console
            console.log(colors.red(colors.bold(err)));
          };
        });
      };
    };
  });
});

//log all connections
server.on("connection", (socket) => {
    //On connection log ip and port
    console.log(colors.yellow("Connection from"), colors.rainbow(socket.remoteAddress + ":" + socket.remotePort));
});

LOG = colors.green("Server listing on port ") + colors.red(port.toString()) + colors.green(" With the settings ") + colors.yellow(JSON.stringify({pause:data.pause, username:data.username, password:data.password}));

//listen on port and host
server.listen(port, host, () => {
  console.log(LOG);
});
