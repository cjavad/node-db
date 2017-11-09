//manage database and query!
//Database config
const JsonDB = require("node-json-db");
const db = new JsonDB("db", true /*To autosave*/, true /*Save in human reable form*/);
const query = require("./query.js");

function pquery(q){
    function isNumeric(num){
        return !isNaN(num)
    }
    function tryParseJSON (jsonString){
        try {
            var o = JSON.parse(jsonString);
    
            // Handle non-exception-throwing cases:
            // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
            // but... JSON.parse(null) returns null, and typeof null === "object", 
            // so we must check for that, too. Thankfully, null is falsey, so this suffices:
            if (o && typeof o === "object") {
                return o;
            }
        }
        catch (e) { }
    
        return false;
    };
    const out = query.parse(q);
    var path = out[1][0],
    command = out[0],
    args = out[1];
    if(isNumeric(args[1])){
        var data = Number(args[1]);
    } else if(typeof tryParseJSON(args[1]) === "object"){
        var data = JSON.parse(args[1]);
    } else if(typeof args[1] === "string"){
        data = args[1];
    } else {
        return false;
    }
    
    return false;
}

console.time("BENCH")
query.parse("db.hello.push('hello')")
console.timeEnd("BENCH")

module.exports = {
    query: query,
    parse: pquery
}