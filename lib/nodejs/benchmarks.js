const db_sync = require("./sync");
const db_async = require("./async");

host = "localhost";
port = 3434;
username = "admin";
password = "password";

dba = new db_async(host, port, username, password);

dbs = new db_sync(host, port, username, password);

var log = (d) => {console.log(d)};

//test functions
var a = (db) => {
    for (let i = 0; i < 1000; i++) {
        var path = "/" + i.toString();
        db.push(path, "RANDOM DATA", (data) => {log(data.toString())});
        db.get(path, (data) => {log(data.toString())});
        db.delete(path, (data) => {log(data.toString())}); 
    }
}

var s = (db) => {
    for (let i = 0; i < 1000; i++) {
        var path = "/" + i.toString();
        log(db.push(path, "RANDOM DATA"));
        log(db.get(path));
        log(db.delete(path));
    }
}

// console.time("Sync-db");
// s(dbs);
// console.timeEnd("Sync-db");

console.time("Async-db");
a(dba);
console.timeEnd("Async-db");
