//new json parser
//import modules that are required
const JsonDB = require("./database")
const auth = require("./auth.js");
const db = new JsonDB("db", true, true)
const colors = require("colors/safe")


const ERRORS = ["PROP_ERR", "AUTH_ERR", "PATH_ERR", "COM_ERR", "RUN_ERR", "PARSE_ERR"];
const VALID_COMMANDS = ["getData", "push", "delete", "query"];
/**
 * @constant VALID_COMMANDS is an array with all valid commands
 * @constant PATH_ONLY is an a array with all commands that only require a path
 * @constant DATA is an array specifiying commands that also use data
 * @constant ERRORS
 * PROP_ERR (0) is given if not enough properties is given
 * AUTH_ERR (1) is given if a wrong username/password is given
 * PATH_ERR (2) is given if a path does't exist
 * COM_ERR (3) is given if a wrong command is given
 * RUN_ERR (4) is given if a runtime error has occoured
 * PARSE_ERR (5) is given if non valid json input is given
 */

//Return custom error based on index
function error(error_num, body = undefined){
    if(ERRORS.length > error_num){
        console.log(colors.red(ERRORS[error_num]), "in", colors.yellow(JSON.stringify(body)));
        return ERRORS[error_num];
    } else {
        throw new TypeError("Error index is not that big");
    }
}


//parse and check json
function parse_json(json_str){
    try {
        body = JSON.parse(json_str);
        //if not valid json return false
    } catch(_){console.log(_); return error(5); }
    //check if keys exist
    var check1 = (body["path"] === undefined || body["command"] == undefined || body["username"] == undefined || body["password"] === undefined);
    var check2 = !(VALID_COMMANDS.indexOf(body["command"]) > -1);
    if(!(check1 && check2)){
        return body;
    } else {
        return error(5, body);
    }
}


function use_db(body){
    if(body["command"] === "getData" || body["command"] === "delete"){
        try{
            return db[body.command](body.path);
        } catch(_){
            return _.name === "DataError" ? error(2):error(4);
        }
    } else if(body["command"] === "push"){
        //if you want to push data to database
        return db.push(body.path, body.data, body.override);
    } else if(body["command"] === "find"){
        //if command is a query
        return db.find(body.path, body.data);
    } else {
        //return COM_ERR
        return error(3);
    }
}

function parse(jsonstring){
    json = parse_json(jsonstring);
    if(ERRORS.indexOf(json.toString()) > -1){
        return json;
    }
    //check username/password 
    else if(auth.check(json.username, json.password)){
        //return database
        return use_db(json);
    } else {
        //else return AUTH_ERR
        return error(1, json);
    }
}

module.exports = {
    db:db,
    parse:parse,
    error:error
}