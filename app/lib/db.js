//manage database and query!
//Database config
const JsonDB = require("node-json-db");
const db = new JsonDB("db", true /*To autosave*/, true /*Save in human reable form*/);
const query = require("./query.js");

function pquery(q){
    const out = query.parse(q);
    var path = out[1][0],
    command = out[0],
    args = out[1];
    console.log("path is", path, "Command is", command, "with args", args);
    console.log("from", out);
}
console.log(pquery('db.hello.com.push({pc: 121}, false)'));