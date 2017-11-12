//new json parser
//import modules that are required
const JsonDB = require("./db/index.js");
const auth = require("./auth.js");
const db = new JsonDB("db", true, true)

const ERRORS = ["PROP_ERR", "AUTH_ERR", "PATH_ERR", "COM_ERR", "RUN_ERR", "PARSE_ERR"];
const VALID_COMMANDS = ["getData", "push", "delete", "query"];
const PATH_ONLY = ["getData", "delete"];
const DATA = ["push", "find"]
/**
 * @constant VALID_COMMANDS is an array with all valid commands
 * @constant PATH_ONLY is an a array with all commands that only require a path
 * @constant DATA is an array specifiying commands that also use data
 * @constant ERRORS
 * PROP_ERR is given if not enough properties is given
 * AUTH_ERR is given if a wrong username/password is given
 * PATH_ERR is given if a path does't exist
 * COM_ERR is given if a wrong command is given
 * RUN_ERR is given if a runtime error has occoured
 * PARSE_ERR is given if non valid json input is given
 */

//Return custom error based on index
function error(error_num){
    if(ERRORS.length > error_num){
        return ERRORS[error_num];
    } else {
        throw new TypeError("Error index is not that big");
    }
}

function checkerror(string){
    if(ERRORS.indexOf(string) > -1) {
        return true;
    } else {
        return false;
    }
}

//parse and check json
function parse_json(json_str){
    try {
        body = JSON.parse(json_str);
        //if not valid json return false
    } catch(_){ return error(5); }
    //check if keys exist
    check1 = (body["path"] === undefined || body["command"] == undefined || body["username"] == undefined || body["password"] === undefined);
    if(check1){
        //on or more values if undefined
        return error(5);
        //check if command is valid
    } else if(!VALID_COMMANDS.indexOf(body["command"]) > -1){
        return error(5);
    } else {
        if(body.command == "find"){
            var over = null;
        } else {
            var over = body.override;
        }
        json = {
            username:body.username,
            password:body.password,
            command:body.command,
            path:body.command,
            data:body.data,
            override:over
        }
        //if it passed all checks return body object
        return json;
    }
}


function use_db(command, path, data = null, override = false){
    if(PATH_ONLY.indexOf(command) > -1 && data === null && data === nulls){
        try {
            return db[command](path);
        } catch (err) {
            return err.name === "DataError" ? error(2):error(4);
        }
    } else if (DATA.indexOf(command) > -1 && data !== null){
        if(command === "find"){
            //custom stament for query
            return db[command](data);
        } else if(command === "push"){
            return db[command](data, override);
        } else {
            return error(3);
        }
    } else {
        return error(3);
    }
}

function parse(jsonstring){
    json = parse_json(jsonstring);
    if(checkerror(json)){
        return json;
    } else if(!auth.check(json.username, json.password)){
        return error(1);
    }
    data = use_db(json["command"], json["path"], json["data"]);
}