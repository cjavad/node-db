//import modules that are required
var colors = require('colors/safe');
const JsonDB = require("./db/index.js");
const auth = require("./auth.js");
const db = new JsonDB("db", true, true)


/**
 * @constant VALID_COMMANDS is an array with all valid commands
 * @constant PATH_ONLY is an a array with all commands that only require a path
 * 
 * @throws
 * PROP_ERR is given if not enough properties is given
 * AUTH_ERR is given if a wrong username/password is given
 * PATH_ERR is given if a path does't exist
 * COM_ERR is given if a wrong command is given
 * RUN_ERR is given if a runtime error has occoured
 * PARSE_ERR is given if non valid json input is given
 */


const VALID_COMMANDS = ["getData", "push", "delete", "query"];

const PATH_ONLY = ["getData", "delete"];

//Parse json and inject database with data
function parse_body(json){
    //parse json
    body = JSON.parse(json);
    //check if all main values is in bodys
    if (
        (body["path"] === undefined || body["command"] == undefined || body["username"] == undefined || body["password"] === undefined)
    ) {
        //if not return and PROP_ERR
        console.log(colors.red("PROP_ERR"), colors.yellow(body));
        return "PROP_ERR";
    //If it is check if the command is valid
    } else if(VALID_COMMANDS.indexOf(body["command"]) > -1){
        //if it is valid set a persistent varibel
        COMMAND = body["command"];
        //check if username/password is valid
        if(!auth.check(body.username, body.password)){
            //if not return an AUTH_ERR
            console.log(colors.red("AUTH_ERR"), colors.yellow(body));
            return "AUTH_ERR";
        }
        //else check if any of the path only commands mathes with COMMAND 
        else if(PATH_ONLY.indexOf(COMMAND) > -1){
            //if it does try to use the path
            try {
                console.log(console.log(colors.blue(COMMAND.toString().toUpperCase())));
                return db[COMMAND](body.path);
            } catch(err) {
                //if it catches any errors check if its a DataError
                error = err.name === "DataError" ? "PATH_ERR":"RUN_ERR";
                //and return either PATH_ERR or RUN_ERR
                console.log(colors.red(error), colors.yellow(body));
                return error;
            }
        //if command isn't a path only command check if its the push command
        } else if(COMMAND = "push" && (body.data !== undefined && body.override !== undefined)){
            console.log(colors.green("PUSH".toUpperCase()));
            return db["push"](body.path, body.data, body.override);
        } else {
            //else return RUN_ERRs
            console.log(colors.red("RUN_ERR"), colors.yellow(body))
            return "RUN_ERR";
        }
    } else {
        //if command does not exist return COM_ERRs
        console.log(COMMAND)
        console.log(colors.red("COM_ERR"), colors.yellow(body));
        return "COM_ERR";
    }
    //If anything else return PARSE_ERR
    return "PARSE_ERR"
}

//export functions and database
module.exports = {
    db:db,
    parse:parse_body
};
