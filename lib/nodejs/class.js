var netlinkwrapper = require("netlinkwrapper");

function get_obj(username, password, command, path, data = null, override = null){
    if(data === null && override === null){
        return {username:username, password:password, command:command, path:path}
    } else {
        return {username:username, password:password, command:command, path:path, data:data, override:override}
    }
}
class db {
    constructor(host, port, username, password, buffer = 2048){
        this.user = username;
        this.pass = password;
        this.buffer = buffer;
        this.socket = new netlinkwrapper();
        this.socket.connect(port, host);
        this.socket.blocking(false);
    }
}
/**
 * @function 
 * @param {string} path 
 */
db.prototype.get = function(path){
    var obj = JSON.stringify(get_obj(this.user, this.pass, "getData", path));
    this.socket.write(obj);
    var data = this.socket.read(this.buffer);
    while(data === null || data === undefined){
        data = this.socket.read(this.buffer);
        console.log(data);
    }
    return data;
}

db.prototype.delete = function(path){
    var obj = JSON.stringify(get_obj(this.user, this.pass, "delete", path));
    this.socket.write(obj);
    return this.socket.read(this.buffer);
}

db.prototype.push = function(path, data, override = false){
    var obj = JSON.stringify(get_obj(this.user, this.pass, "push", path, data, override));
    this.socket.write(obj);
    return this.socket.read(this.buffer);
}

var test = new db("localhost", 3434, "admin", "password");
console.log(test.get("/"));

module.exports = db;