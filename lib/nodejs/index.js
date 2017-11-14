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
        return {username:username, password:password, commandw:command, path:path, data:data, override:override}
    }
}


function push(path, data, override = false){
    let tmp = null;
    json = get_obj(username, password, "get", path);
    client.on("data", function(data){
        tmp = data;
        console.log(data);
        client.destroy();
    })
    while(tmp === null){
        //Do noting
    }
    return tmp;
}

init("localhost", 3434, "admin", "password");
console.log(push("/", "helloworld"))
