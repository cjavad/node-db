import { userInfo } from "os";

const db_sync = require("./sync");
const db_async = require("./async");

host = "localhost";
port = 3434;
username = "admin";
password = "password";

dba = db_async(host, port, username, password);

dbs = db_sync(host, port, username, password);

console.time("Sync-db");
//DOSTUFF
console.timeEnd("Sync-db");

console.time("Async-db");
//DOSTUFF
console.timeEnd("Async-db");