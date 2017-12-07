//import modules that are required
const JsonDB = require("./database");
const auth = require("./auth.js");
const db = new JsonDB("db", true, true);
const colors = require("colors/safe");

var LOADED = true;

const ERRORS = ["PROPERTY_ERROR", "AUTH_ERROR", "PATH_ERROR", "COMMAND_ERROR", "RUN_ERROR", "PARSE_ERROR", "NO_DATABASE_SELECTED"];
const VALID_COMMANDS = ["getData", "push", "delete", "find", "find_one", "use", "drop"];
/**
 * @constant VALID_COMMANDS is an array with all valid commands
 * @constant ERRORS
 * PROPERTY_ERROR (0) is given if not enough properties is given
 * AUTH_ERROR (1) is given if a wrong username/password is given
 * PATH_ERROR (2) is given if a path does't exist
 * COMMAND_ERROR (3) is given if a wrong command is given
 * RUN_ERROR (4) is given if a runtime error has occoured
 * PARSE_ERROR (5) is given if non valid json input is given
 * NO_DATABASE_SELECTED (6) is given if not database is selected
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

async function log_command(command){
    if(VALID_COMMANDS.indexOf(command) > -1){
        if(command === "push"){
            console.log(colors.green(command));
        } else if (command === "getData" || command === "query"){
            console.log(colors.blue(command));
        } else if (command === "delete"){
            console.log(colors.red(command));
        } else {
            return false;
        }
    } else {
        return false;
    }
}


//parse and check json
function parse_json(json_str){
    try {
        body = JSON.parse(json_str);
        /*if not valid json return false*/
    } catch(_){ return error(5, json_str); }
    /*check if keys exist*/
    var check1 = (body["command"] == undefined || body["username"] == undefined || body["password"] === undefined);
    var check2 = !(VALID_COMMANDS.indexOf(body["command"]) > -1);
    if(!(check1 && check2)){
        return body;
    } else {
        return error(5, body);
    }
}


function use_db(body){
    if((body["command"] === "getData" || body["command"] === "delete") && LOADED){
        try{
            return db[body.command](body.path);
        } catch(_){
            return _.name === "DataError" ? error(2, body):error(4, body);
        }
    } else if(body["command"] === "push" && LOADED){
        //if you want to push data to database
        return db.push(body.path, body.data, body.override);
    } else if(body["command"] === "find" || body["command"] === "find_one" && LOADED){
        //if command is a query
        return db[body["command"]](body.path, body.data);
    } else if(body["command"] == "use") {
      //switch database
        return db["use"][body.data];
    } else {
        return error(3, body);
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
        log_command(json.command);
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
};
