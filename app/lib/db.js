//new json parser
//import modules that are required
const JsonDB = require("./db/index.js");
const auth = require("./auth.js");
const db = new JsonDB("db", true, true)


auth.check = function(s, a){return true}

const ERRORS = ["PROP_ERR", "AUTH_ERR", "PATH_ERR", "COM_ERR", "RUN_ERR", "PARSE_ERR"];
const VALID_COMMANDS = ["getData", "push", "delete", "query"];
const PATH_ONLY = ["getData", "delete"];
const DATA = ["push", "find"]
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
    } catch(_){console.log(_); return error(5); }
    //check if keys exist
    var check1 = (body["path"] === undefined || body["command"] == undefined || body["username"] == undefined || body["password"] === undefined);
    var check2 = !(VALID_COMMANDS.indexOf(body["command"]) > -1);
    if(!(check1 && check2)){
        return body;
    } else {
        return error(5);
    }
}


function use_db(body){
    if(PATH_ONLY.indexOf(body["command"]) > -1){
        try {
            return db[body["command"]](body["path"])
        } catch(err) {
            //check if error is a path error or dataerror
            return err.name === "DataError" ? error(2):error(4);
        }
    } else if(DATA.indexOf(body["command"]) > -1){

    } else {
        //return COM_ERR
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
    return use_db(json["command"], json["path"], json["data"], json["override"]);
}



obj1 = {username:"admin",password:"password",command:"push",data:"hello",path:"/path",override:true}

obj2 = {username:"admin",password:"password",command:"getData",path:"/path"}

console.log(parse(JSON.stringify(obj1)))
console.log(parse(JSON.stringify(obj2)))
console.log(!VALID_COMMANDS.indexOf(obj2["command"]) > -1)