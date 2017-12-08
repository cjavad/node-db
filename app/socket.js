const net = require("net");
const db = require("./lib/dbrunner.js");
const auth = require("./lib/auth.js");
const colors = require("colors");
const print = require("./lib/print.js");

//reponse codes
const OK = "_OK_";
const ERROR = "_ERROR_";

function checkLogin(json) {
    if(json.command === "login" && Object.keys(json).includes("username") && Object.keys(json).includes("password")) {
        var login = auth.login(json.username, json.password);
        if(login) {
            //return object with database class and key
            return {
                db: new db.DB(login),
                key:login
            };
        } else {
            return db.error(1, json);
        }
    } else {
        return false;
    }
}

//callback returns server status
module.exports = function(host, port, callback = function(back) { print.print(back); }) {
    const server = net.createServer( (socket) => {
        //on data parse request
        socket.on("data", (data) => {
            try {
                if (socket.db === undefined && socket.key === undefined && !socket.loggedIn) {
                    var login = checkLogin(JSON.parse(data.toString()));
                    if (login) {
                        socket.loggedIn = true;
                        socket.db = login.db;
                        socket.key = login.key;
                    } else {
                        socket.write(db.error(1, "Wrong username/password"));
                    }
                } else if (socket.loggedIn && auth.isLoggedIn(socket.key)) {
                    //stop if any unexpected erros occurs
                    if(!auth.isLoggedIn(socket.key)) {
                        socket.write(db.error(1, "Not Logged In"));
                    } else {
                        var response = socket.db.run(data.toString());
                        socket.write(JSON.stringify(response));
                    };
                } else {
                    socket.write(db.error(1, "Not logged In"));
                }
            } catch (_) {
                if(response === undefined){
                    socket.write(OK);
                } else {
                    print.error(colors.red(_));
                    socket.write(ERROR);
                }
            }
        });
    });

    server.on("connection", (socket) => {
        socket.loggedIn = false;
        print.print(colors.yellow("Connection from"), colors.rainbow(socket.remoteAddress + ":" + socket.remotePort));
    });

    server.on("close", (socket) => {
        if(socket.loggedIn) auth.logout(socket.key);
        print.print(colors.bgWhite(socket.remoteAddress + ":" + socket.remotePort, "Disconnected"));
    });

    server.listen(port, host, () => {
        callback(colors.green("Listening on port " + port.toString()));
    });
};