const path = require("path");
const net = require("net");
const db = require("./db.js");
const fs = require("fs");
const auth = require("./auth.js");


if(process.argv.length < 3){
    console.log("You will need to specify a config file")
    process.exit(0);
} else {
    data = JSON.parse(fs.readFileSync(path.join(__dirname + "/" + process.argv[2])))
    auth.config(data.username, data.password);
}

port = data.port || 3434;

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