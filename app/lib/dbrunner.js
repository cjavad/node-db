//require needed modules
const print = require("./print.js");
const JsonDB = require("./database");
const auth = require("./auth.js");
const colors = require("colors/safe");

/* Array with errors and valid commands */
const ERRORS = ["PROPERTY_ERROR", "AUTH_ERROR", "PATH_ERROR", "COMMAND_ERROR", "RUN_ERROR", "PARSE_ERROR", "NO_DATABASE_SELECTED"];
const VALID_COMMANDS = ["login", "getData", "push", "delete", "find", "find_one", "use", "save"];

/*
faster than Array.includes();
*/
Array.prototype.inArray = function(string) {
    return this.indexOf(string) > -1;   
}

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
function error(error_num, body = "_") {
    if (ERRORS.length > error_num) {
        print.error(colors.red(ERRORS[error_num]), "in", colors.yellow(JSON.stringify(body)));
        return ERRORS[error_num];
    } else {
        throw new TypeError("Error index is not that big");
    }
}


/*
* To check if a string is a error do
ERRORS.indexOf(mystring) > -1 ? true:false or
ERRORS.includes(mystring) or my implamentaion
ERRORS.inArray(mystring)
*/

/*
Parser
- Can log you in
- validates command
*/
function parser(object) {
    try {
        object = JSON.parse(object);
    } catch (_) {print.error(colors.red(_)); return error(5, object); }
    //check if required keys exists (using sick Es6 features)
    if (object.command !== undefined && VALID_COMMANDS.inArray(object.command)) {
        return object;
    } else {
        return error(5, object);
    }
}


/**
 * Database class
 * Manipulates with database
 * Verifies your login
 */

class DB {
    constructor(session, database = "db", saveOnPush = true, humanReadable = false) {
        this.db = new JsonDB(database, saveOnPush, humanReadable);
        this.session = session;
    }

    //push to database
    static push(db, path, data, override = false) {
        print.print(colors.green("PUSH", path));
        return db.push(path, data, override);
    }
    //get data from database
    static getData(db, path) {
        try {
            print.print(colors.blue("GET", path));
            return db.getData(path);
        } catch (_) {
            return _.name == "DataError" ? error(2, "GET " + path) : error(4, "GET " + path);
        }
    }
    //delete data from database
    static delete(db, path) {
        try {
            print.print(colors.red("DELETE", path));
            return db.delete(path);
        } catch (_) {
            return _.name == "DataError" ? error(2, "DELETE " + path) : error(4, "DELETE " + path);
        }
    }
    //find in database
    static find(db, path, query) {
        try {
            print.print(colors.magenta("FIND", query));
            return db.find(path, query);
        } catch (_) {
            return _.name == "DataError" ? error(2, "FIND " + path + " " + query) : error(4, "FIND " + path + " " + query);
        }
    }
    //find first result
    static find_one(db, path, query) {
        try {
            print.print(colors.magenta("FIND_ONE", query));
            return db.find_one(path, query);
        } catch (_) {
            return _.name == "DataError" ? error(2, "FIND_ONE " + path + " " + query) : error(4, "FIND_ONE " + path + " " + query);
        }
    }
    //switch database
    static use(db, database, humanReadable = false) {
        print.print(colors.yellow("USE", database));
        db.use(database, true, humanReadable);
        this.db = db;
    }
    //write to database (does it automaticly by default)
    static save(db) {
        db.save();
    }
}

/*Example json
{command:"find", data:{class:"you"}}
*/
//hopefully rundata is checked
DB.prototype.run = function (data) {
    if (!auth.isLoggedIn(this.session)) return error(1);
    data = parser(data);
    if (ERRORS.inArray(data)) return data;
    if (["use", "push"].includes(data.command)) {
        return DB[data.command](this.db, data.path, data.data, data.last);
    } else if (["find", "find_one"].inArray(data.command)) {
        return DB[data.command](this.db, data.path, data.data);
    } else if (["getData", "delete"].inArray(data.command)) {
        return DB[data.command](this.db, data.path);    
    } else if (data.command === "save") {
        return DB[data.command](this.db);
    } else {
        return error(4, data);
    }
}


module.exports = {
    DB: DB,
    error: error
};