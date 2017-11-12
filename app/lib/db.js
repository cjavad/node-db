//manage database and query!
//Database config
const JsonDB = require("./db/index.js");
const auth = require("./auth.js");
const db = new JsonDB("db", true, true)

//for socket
function parse_body(json){
    body = JSON.parse(json)
    if(
        !(body.hasOwnProperty("path") || body.hasOwnProperty("command") || body.hasOwnProperty("username") || body.hasOwnProperty("password"))
    ){
        console.log("PROP_ERR",body)
        return false;
    } else if(!body.command in ["getData", "push", "delete"]){
        console.log("COM_ERR", body)
        return false;
    }

    if(!auth.check(body.username, body.password)){
        return "Wrong password/username"
        console.log("AUTH_ERR", body)
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
    } else if((body.hasOwnProperty("data") || body.hasOwnProperty("override")) && body.command === "push"){
        console.log(body.command.toUpperCase());
        return db[body.command](body.path, body.data, body.override);
    } else {
        console.log("ERR", body)
        return false;
    }
}

module.exports = {
    db:db,
    parse:parse_body
};