const JsonDB = require("../../app/lib/db/index.js");
const auth = require("./auth.js");
const db = new JsonDB("db", true, true)


function parse_body(body){
    var body = JSON.parse(body);

    if(!("key" in body || "path" in body || "command" in body || "username" in body || "password" in body)){
        return false;
    } else if(!body.command in ["getData", "push", "delete"]){
        return false;
    }

    if(!auth.check(body.username, body.password)){
        return "Wrong password/username"
        console.log(body)
        return false;

    } else if(body.command === "getData" || body.command ===  "delete"){
        console.log(body.command.toUpperCase());
        try {
            return db[body.command](body.path)
        } catch (error) {
            if(error.name === "DataError"){
                return "Path does not exist"
            } else {
                console.log(error.name);
                return error.name;
            }
        }
    } else if(("data" in body || "override" in body) && body.command === "push"){
        console.log(body.command.toUpperCase());
        return db[body.command](body.path, body.data, body.override);
    } else {
        return false;
    }
}

module.exports = {
    parse:parse_body
};