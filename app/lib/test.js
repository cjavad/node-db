var JsonDB = require("./db/JsonDB")
const db = new JsonDB("test", true, true)

db.push("/hello/my/name", {"is":"javad", "and":"alia"})
db.pus