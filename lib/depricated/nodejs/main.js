/*
Async is the way to go.
I will be building upon this, but might take the synchronous one up again.
*/

const net = require("net"); // requires this shit pls install global

//generate object function
function get_obj(username, password, command, path, data = null, override = null){
    if(data === null && override === null){
        return {username:username, password:password, command:command, path:path}
    } else {
        return {username:username, password:password, command:command, path:path, data:data, override:override}
    }
}


class db {
    constructor(host, port, username, password){
        this.username = username;
        this.password = password;
        this.socket = new net.createConnection({port:port, host:host});
    }
}


db.prototype.get = function(path, callback = console.log){
    var obj = get_obj(this.username, this.password, "getData", path);
    this.socket.write(JSON.stringify(obj));
    this.socket.on("data", (data) => {
        callback(data);
        this.socket.destroy();
    });
}

db.prototype.delete = function(path, callback = console.log){
    var obj = get_obj(this.username, this.password, "delete", path);
    this.socket.write(JSON.stringify(obj));
    this.socket.on("data", (data) => {
        callback(data);
        this.socket.destroy();
    });
}

db.prototype.push = function (path, data, override = false, callback = console.log){
    var obj = get_obj(this.username, this.password, "push", path, data, override);
    this.socket.write(JSON.stringify(obj));
    this.socket.on("data", (data) => {
        callback(data);
        this.socket.destroy();
    });
}


db.prototype.find = function (path, query, callback = console.log){
    var obj = get_obj(this.username, this.password, "find", path, data, false);
    this.socket.write(JSON.stringify(obj));
    this.socket.on("data", (data) => {
        callback(data);
        this.socket.destroy();
    });
}


db.prototype.find_one = function (path, query, callback = console.log){
    var obj = get_obj(this.username, this.password, "find_one", path, data, false);
    this.socket.write(JSON.stringify(obj));
    this.socket.on("data", (data) => {
        callback(data);
        this.socket.destroy();
    });
}


function print(data){
    console.log(data.toString());
}

var d = new db("localhost", 3434, "admin", "password");
d.get("/", print)

module.exports = db;
