const net = require("net");


function get_obj(username, password, command, path, data = null, override = null){
    if(data === null && override === null){
        return {username:username, password:password, command:command, path:path}
    } else {
        return {username:username, password:password, command:command, path:path, data:data, override:override}
    }
}
class db_socket {
    constructor(host, port, username, password){
        this.socket = new net.Socket()
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;

    }
}


db_socket.prototype.get = function(path){
    var obj = JSON.stringify(get_obj(this.username, this.password, "getData", path));
    this.socket.connect(this.port, this.host, function(){
        
    });
    return this.socket.read(1024);
}

var db = new db_socket("127.0.0.1", 3434 ,"admin", "password");
console.log(db.get("/"));