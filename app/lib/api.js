//lib/api.js
//express routing config
const auth = require("./auth.js");
const db = require("./db.js").db




module.exports = function(app, userpass){
    auth.config(userpass.username, userpass.password);
    app.use(function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*, *, *, Accept");
        next();
    });
    app.get("/", (req, res, next) => {
        var str = '<body style="background: blanchedalmond; color: sandybrown; margin: 0 auto; width: 50%;"><h2>Where is the control panel???</h2></body>'
        res.send(str);
    });

    app.get("/cp", (req, res) => {
        c = auth.check(req.query.user, req.query.pass)
        if(c){
            res.send("true")
        } else if(!c){
            res.send("false")
        } else {
            res.send("error")
        }
        return true
    });

    app.get("/db", (req, res) => {
        var False = false //support for python
        var body = JSON.parse(req.query.body);

        if(!("key" in body || "path" in body || "command" in body)){
            return false;
        } else if(!body.command in ["getData", "push", "delete"]){
            return false;
        }
        if(!auth.check(body.username, body.password)){
            res.send("Wrong password/username");
            console.log(body)
            return false;
        } else if(body.command === "getData" || body.command ===  "delete"){
            console.log(body.command.toUpperCase());
            var sendt = db[body.command](body.path)
            res.send(sendt);
        } else if(("data" in body || "override" in body) && body.command === "push"){
            console.log(body.command.toUpperCase());
            var sendt = db[body.command](body.path, body.data, body.override);
            res.send(sendt)
        } else {
            res.sendStatus(403);
            return false;
        }
        
        
    });
}

/* Example endpoint body object
{
    username:"admin",
    password:"login",
    command: "push"
    path:"/hello/path[]",
    data:["array"],
    override: false
}


*/
