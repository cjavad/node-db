const request = require("request")

let password = null;
let username = null;
let host = "localhost";
let port = "3434"

function connect(user, pass, host="localhost", port="3434"){
    username = user;
    password = pass;
    host = host;
    port = port;
}

function get_obj(path, data = null, override = null){
    if(!(data === null && override === null)){
        return {"username":username, "password":password, "path":path, "data":data, "override":override}
    } else {
        return {"username":username, "password":password, "path":path}
    }
}

function push(path, data, override){
    obj = get_obj(path, data, override);
    url = "http://" + host + ":" + port + "/" 
    request.get()
}

