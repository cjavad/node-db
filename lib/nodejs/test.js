var netlinkwrapper = require("netlinkwrapper");

var net = new netlinkwrapper();


obj1 = '{"username":"admin", "password":"password", "command":"getData", "path":"/"}'

net.connect(3434, "localhost");
net.blocking(false);

var b = net.write(obj1);
var str = net.read(1024);

while(str === undefined) {
    str = net.read(1024);
    if(str !== undefined){
        console.log(str);
    }
}

//net
const net = require("net");

let host;
let port;
let username;
let password;
let client;

function init(host1, port1, username1, password1){
    host = host1;
    port = port1;
    username = username1;
    password = password1;
    client = new net.Socket();
    client.connect(port, host);    
}


function get_obj(username, password, command, path, data = null, override = null){
    if(data === null && override === null){
        return {username:username, password:password, command:command, path:path}
    } else {
        return {username:username, password:password, command:command, path:path, data:data, override:override}
    }
}


function push(path, data, override = false){
    var json = get_obj(username, password, "push", path, data, override);
    client.write(JSON.stringify(json));
    client.on("data", function(data){
        console.log(data.toString());
        client.destroy();
    })
}

function get(path){
    var json = get_obj(username, password, "getData", path);
    client.write(JSON.stringify(json));
    client.on("data", function(data){
        console.log(data.toString());
        client.destroy();
    })
}