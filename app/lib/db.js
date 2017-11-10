//manage database and query!
//Database config
const JsonDB = require("./db/JsonDB.js");
const db = new JsonDB("db", true /*To autosave*/, true /*Save in human reable form*/);


module.exports = {
    db:db
}