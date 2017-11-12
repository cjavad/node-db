//manage database and query!
//Database config
var colors = require('colors/safe');
const JsonDB = require("./db/index.js");
const auth = require("./auth.js");
const db = new JsonDB("db", true, true)

//Parse json and inject database with data
function parse_body(json){
    body = JSON.parse(json)
    if(
        !(body.hasOwnProperty("path") || body.hasOwnProperty("command") || body.hasOwnProperty("username") || body.hasOwnProperty("password"))
    ){
        console.log(colors.red("PROP_ERR"), colors.yellow(body))
        return "PROP_ERR";
    
    } else if(!body.command in ["getData", "push", "delete"]){
        console.log(colors.red("COM_ERR"), colors.yellow(body))
        return "COM_ERR";
    }

    if(!auth.check(body.username, body.password)){
        return "Wrong password/username"
        console.log(colors.red("AUTH_ERR"), colors.yellow(body))
        return "AUTH_ERR";

    } else if(body.command === "getData" || body.command ===  "delete"){
        console.log(body.command.toUpperCase());
        try {
            return db[body.command](body.path)
        } catch (error) {
            if(error.name === "DataError"){
                console.log(colors.red("PATH_ERR"), colors.yellow(body))
                return "PATH_ERR"
            } else {
                console.log(error.name);
                return error.name;
            }
        }
    } else if((body.hasOwnProperty("data") || body.hasOwnProperty("override")) && body.command === "push"){
        console.log(colors.green(body.command.toUpperCase()));
        return db[body.command](body.path, body.data, body.override);
    } else {
        console.log(colors.red("RUN_ERR"), colors.yellow(body))
        return "RUN_ERR";
    }
}

module.exports = {
    db:db,
    parse:parse_body
};